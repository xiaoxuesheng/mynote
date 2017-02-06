/**
 *
 * 分段锁，系统提供一定数量的原始锁，根据传入对象的哈希值获取对应的锁并加锁
 * 注意：要锁的对象的哈希值如果发生改变，有可能导致锁无法成功释放!!!
 * Created by jianjun.hao
 * 2016/9/10.
 */
public class SegmentLock<T> {

    private Integer segments = 16;//默认分段数量
    private final HashMap<Integer, ReentrantLock> lockMap = new HashMap<>();

    public SegmentLock() {
        init(null, false);
    }

    public SegmentLock(Integer counts, boolean fair) {
        init(counts, fair);
    }

    private void init(Integer counts, boolean fair) {
        if (counts != null) {
            segments = counts;
        }
        for (int i = 0; i < segments; i++) {
            lockMap.put(i, new ReentrantLock(fair));
        }
    }

    public void lock(T key) {
        ReentrantLock lock = lockMap.get(key.hashCode() % segments);
        lock.lock();
    }

    public void unlock(T key) {
        ReentrantLock lock = lockMap.get(key.hashCode() % segments);
        lock.unlock();
    }


}


/**
 *
 * 分段锁的基础上发展起来的第二种锁策略，目的是实现真正意义上的细粒度锁。每个哈希值不同的对象都能获得自己独立的锁。
 * 在测试中，在被锁住的代码执行速度飞快的情况下，效率比分段锁慢 30% 左右。如果有长耗时操作，感觉表现应该会更好。
 * Created by jianjun.hao
 * 2016/9/10.
 */
public class HashLock<T> {

    private boolean isFair = false;
    private final SegmentLock<T> segmentLock = new SegmentLock<>();//分段锁
    private final ConcurrentHashMap<T, LockInfo> lockMap = new ConcurrentHashMap<>();

    public HashLock() {
    }

    public HashLock(boolean fair) {
        isFair = fair;
    }

    public void lock(T key) {
        LockInfo lockInfo;
        segmentLock.lock(key);
        try {
            lockInfo = lockMap.get(key);
            if (lockInfo == null) {
                lockInfo = new LockInfo(isFair);
                lockMap.put(key, lockInfo);
            } else {
                lockInfo.count.incrementAndGet();
            }
        } finally {
            segmentLock.unlock(key);
        }
        lockInfo.lock.lock();
    }

    public void unlock(T key) {
        LockInfo lockInfo = lockMap.get(key);
        if (lockInfo.count.get() == 1) {
            segmentLock.lock(key);
            try {
                if (lockInfo.count.get() == 1) {
                    lockMap.remove(key);
                }
            } finally {
                segmentLock.unlock(key);
            }
        }
        lockInfo.count.decrementAndGet();
        lockInfo.unlock();
    }

    private static class LockInfo {
        public ReentrantLock lock;
        public AtomicInteger count = new AtomicInteger(1);

        private LockInfo(boolean fair) {
            this.lock = new ReentrantLock(fair);
        }

        public void lock() {
            this.lock.lock();
        }

        public void unlock() {
            this.lock.unlock();
        }
    }
}
