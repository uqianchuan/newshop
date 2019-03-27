package request;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import util.DBUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.jdbc.Statement;
import net.sf.json.JSONArray;

@WebServlet("/Products")

public class Products extends HttpServlet{
	
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		doPost(request,response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");
		
		String kind = request.getParameter("kind");
		String num = request.getParameter("num");
		
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		
		try {
			Connection connect = DBUtils.getConnect();
			Statement statement = (Statement) connect.createStatement();
			ResultSet result;
			
			String sqlQuery = "";
			
			if(num.equals("1")){
			
				sqlQuery = "select * from " + DBUtils.GOODS + " where gkinds='" + kind + "'";
			
			}else if(num.equals("3")){
			
				sqlQuery = "select * from " + DBUtils.GOODS;
				
			}else{
				
				sqlQuery = "select * from " + DBUtils.GOODS + " where gkinds LIKE '%" + kind + "%'";
			
			}
			result = statement.executeQuery(sqlQuery);
//			ArrayList<Goods> list = new ArrayList<Goods>();
//			Gson gson = new Gson();
			
			JSONArray jsonData = JSONArray.fromObject(convertList(result));
			System.out.println(jsonData.toString());

            PrintWriter outs = response.getWriter();    //把json数据传递到前端，记着前端用ajax接收
            outs.print(jsonData);
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	private Object convertList(ResultSet result) throws SQLException {
		// TODO Auto-generated method stub
		ArrayList<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
        ResultSetMetaData md = result.getMetaData();
        int columnCount = md.getColumnCount();
        while(result.next()){
            Map<String, Object> rowData = new HashMap<String, Object>();
            for (int i = 1; i <= columnCount; i++) {
                rowData.put(md.getColumnName(i), result.getObject(i));
            }
            list.add(rowData);
        }
        return list;
	}
	
	

}

