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



@WebServlet("/Deletcart")

public class Deletcart extends HttpServlet{
	
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
		
		String float_number = request.getParameter("float_number");
		
		
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		
		try {
			Connection connect = DBUtils.getConnect();
			Statement statement = (Statement) connect.createStatement();
			
			String sqldelete = "delete from " + DBUtils.CAR + " where float_number = " + float_number;
			System.out.println(sqldelete);
			
			statement.executeUpdate(sqldelete);
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	

}

