package com.jd.kd.dao.util;

import java.io.IOException;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrServer;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;

public class SolrTest {
	
	private static Logger log = Logger.getLogger(SolrTest.class);
	
	 private static String url = null;
		private static HttpSolrServer server = null;
	
	private SolrTest() {
		url = "http://127.0.0.1:8090/solr/";
		server = new HttpSolrServer(url);
	}
	
   

	public static void addIndexTest() throws SolrServerException, IOException {
		
		
		SolrInputDocument doc1 = new SolrInputDocument();
		doc1.addField("id", "1");
		doc1.addField("title", "云南xxx科技");
		doc1.addField("name", "云南xxx科技");
		doc1.addField("url", "http://localhost:8090/solr/1");
		doc1.addField("cat", "企业信息门户，元数据，数字沙盘，知识管理");
		SolrInputDocument doc2 = new SolrInputDocument();
		doc2.addField("id", "2");
		doc2.addField("title", "胡启稳");
		doc2.addField("name", "云南xxx京东商城");
		doc2.addField("url", "http://localhost:8090/solr/2");
		doc2.addField("cat", "知识管理，企业信息门户，云南，昆明");
		SolrInputDocument doc3 = new SolrInputDocument();
		doc3.addField("id", "3");
		doc3.addField("title", "liferay");
		doc3.addField("name", "云南xxx京东商城");
		doc3.addField("url", "http://localhost:8090/solr/3");
		doc3.addField("test_s", "这个内容能添加进去么？这是动态字段呀");
		List<SolrInputDocument> docs = new ArrayList<SolrInputDocument>();
		docs.add(doc1);
		docs.add(doc2);
		docs.add(doc3);
		
		server.setSoTimeout(1000);  // socket read timeout
		  server.setConnectionTimeout(100);
		  server.setDefaultMaxConnectionsPerHost(100);
		  server.setMaxTotalConnections(100);
		  server.setFollowRedirects(false);  // defaults to false
		  // allowCompression defaults to false.
		  // Server side must support gzip or deflate for this to have any effect.
		  server.setAllowCompression(true);
		  server.setMaxRetries(1); // defaults to 0.  > 1 not recommended.
		  
		  
		server.add(docs);
		server.commit();
		//server.deleteByQuery( "*:*" );// delete everything!

		
		
	}

	private void query() {
		SolrQuery query = new SolrQuery();
		query.setQuery("\"元数据\"");
        QueryResponse qr;
		try {
			String insPath = "F:\\servers\\apache-tomcat-6.0.351\\webapps\\solrapp\\solr";   
	        String tempServer = "http://localhost:8080/solr";   
			//CoreAdminRequest.createCore("collection0", insPath, server);
			
			query.setHighlight(true).setHighlightSnippets(1); 
			query.addHighlightField("name"); 
			query.setSort("name",ORDER.desc);
			// 以下两个方法主要是在高亮的关键字前后加上html代码
		    query.setHighlightSimplePre("<font color=\"red\">"); 
		    query.setHighlightSimplePost("</font>");
			
			/*设置从第十条开始取*/
            //query.setStart(1);
            /*每次取出10条记录*/
          //  query.setRows(1);
			qr = server.query(query);
			
			SolrDocumentList beans = qr.getResults();
	        for(SolrDocument solrDocument : beans) {
	        	for(String str : solrDocument.getFieldNames()) {
	        		System.out.println(str);
	        		System.out.println(solrDocument.getFieldValue(str));
	        	}
	        	
	        }
		} catch (SolrServerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		//} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        
	}
	
	/**
     * 增量/全量建立索引 。
     * 
     * @param delta ture，增量建立索引；false，重建所有索引
     */
    public static void buildIndex(boolean delta) {
        SolrQuery query = new SolrQuery();
        // 指定RequestHandler，默认使用/select
        query.setRequestHandler("/dataimport");

        String command = delta ? "delta-import" : "full-import";
        String clean = delta ? "false" : "true";
        String optimize = delta ? "false" : "true";
        
        query.setParam("command", command)
             .setParam("clean", clean)
             .setParam("commit", "true")
             .setParam("entity", "article")
             .setParam("optimize", optimize);
        try {
        	server.query(query);
        } catch (SolrServerException e) {
            log.error("建立索引时遇到错误，delta:" + delta, e);
        }
    }
    
    private void ikanalyzer() {
    	String text="基于java语言开发的轻量级的中文分词工具包";  
        StringReader sr=new StringReader(text);  
//        IKSegmenter ik=new IKSegmenter(sr, true);  
//        Lexeme lex=null;  
//        while((lex=ik.next())!=null){  
//            System.out.print(lex.getLexemeText()+"|");  
//        }
    }
	
	/**
	 * [添加说明]
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		SolrTest solrTest = new SolrTest();
		//try {
		//	solrTest.addIndexTest();
			solrTest.query();
			//solrTest.buildIndex(true);
		//} catch (SolrServerException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		//} catch (IOException e) {
			// TODO Auto-generated catch block
		//	e.printStackTrace();
		//}
	}

}
