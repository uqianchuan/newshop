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


@WebServlet("/UpdateUser")

public class UpdateUser extends HttpServlet{
	
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
		
		String account = request.getParameter("account");
		String type = request.getParameter("type");
		String value = request.getParameter("value");
		
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		
		try {
			Connection connect = DBUtils.getConnect();
			Statement statement = (Statement) connect.createStatement();
			
			String sqlUpdate = "update " + DBUtils.USERS + " set " + type + " = '" + value + "'" + " where login_id = '" + account + "'";
			System.out.println(sqlUpdate);
			
			statement.executeUpdate(sqlUpdate);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	

}
