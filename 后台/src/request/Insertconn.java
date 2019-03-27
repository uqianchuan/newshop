package request;


import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import util.DBUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mysql.jdbc.Statement;



@WebServlet("/Insertconn")

public class Insertconn extends HttpServlet{
	
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
		
		String gid = request.getParameter("gid");
		String dd_id = request.getParameter("dd_id");
		String count = request.getParameter("count");
		String gname = request.getParameter("gname");
		String gpicture = request.getParameter("gpicture");
		
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		
		try {
			Connection connect = DBUtils.getConnect();
			Statement statement = (Statement) connect.createStatement();
			
			String sqlInsert = "insert into " + DBUtils.CONNECT + "(gid,dd_id,count,gname,gpicture) value('"+gid+"','"+dd_id+"','"+count+"','"+gname+"','"+gpicture+"')";
			System.out.println(sqlInsert);
			
			statement.executeUpdate(sqlInsert);
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	

}
