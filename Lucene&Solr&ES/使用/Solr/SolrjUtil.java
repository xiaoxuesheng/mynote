package com.jd.kd.dao.util;

import java.io.IOException;
import java.util.List;



import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServer;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.stereotype.Repository;

import com.jd.kd.domain.SearchPage;

@Repository
public class SolrjUtil {
    
    private static SolrServer server = new HttpSolrServer(
			"http://localhost:8090/solr/");

    /**
     * 添加或更新对象
     * 
     * @param object
     * @throws SolrServerException
     * @throws IOException
     * @throws Exception
     */
    public void addOrUpdateBean(Object object) throws IOException,
            SolrServerException {
        server.addBean(object);
		server.optimize();
        server.commit();
	}

    /**
     * 删除对象
     * 
     * @param id
     * @throws Exception
     */
	public void deleteById(String id) throws Exception {
        server.deleteById(id);
		server.optimize();
        server.commit();
    }
	
    /**
     * 查询对象
     * 
     * @param str
     * @param obj
     * @return
     * @throws Exception
     */
    @SuppressWarnings({ "rawtypes", "unchecked" })
    public List query(String str, Class clazz) throws Exception {
        SolrQuery query = new SolrQuery();
        query.setQuery("\"" + str + "\"");
        QueryResponse qr = server.query(query);
        List beans = qr.getBeans(clazz);
        return beans;
    }
    
    public static void main(String[] args) {
    	
    	SearchPage searchPage = new SearchPage();
    	searchPage.setId("1");
    	searchPage.setUrl("http://localhost:8090/solr/");
    	searchPage.setTitle("SolrJ");
    	searchPage.setSummary("olrj is a java client to access solr");
    	searchPage.setContent("It offers a java interface to add, update, and query the solr index");
    	
    	SolrjUtil solrjUtil = new SolrjUtil();
    	try {
			solrjUtil.addOrUpdateBean(searchPage);
    		List<SearchPage> searchPagel = solrjUtil.query("java", SearchPage.class); 
			System.out.println(solrjUtil.query("java", SearchPage.class));
			for(SearchPage searchPagew : searchPagel) {
				System.out.println(searchPagew.getContent());
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	
    }
	
}
