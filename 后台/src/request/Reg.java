package request;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import util.DBUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.mysql.jdbc.Statement;



@WebServlet("/Reg")

public class Reg extends HttpServlet{
	
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
		
		String account = request.getParameter("login_id");
		String client_rename = request.getParameter("client_rename");
		String login_password = request.getParameter("login_password");
		String rights = "1";
		double client_money = 0.0;
		int resMsg = 0;
		
		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		
		try {
			Connection connect = DBUtils.getConnect();
			Statement statement = (Statement) connect.createStatement();
			ResultSet result;
			
			String sqlQuery = "select * from " + DBUtils.USERS + " where login_id = '" + account + "'";
			System.out.println(sqlQuery);
			
			result = statement.executeQuery(sqlQuery);
			
			System.out.println("ok");
			if(result.next()){
				
				resMsg = 1;//账号已存在
				
			}else {
				
//				String sqlInsert = "insert into " + DBUtils.USERS + " (login_id,client_rename,login_password) values('" + account + "','" + client_rename + "','" + login_password + "')";
				String sqlInsert = "insert into " + DBUtils.USERS + "(login_id,client_rename,login_password,rights,client_money) value('"+account+"','"+client_rename+"','"+login_password+"','"+rights+"','"+client_money+"')";
				System.out.println(sqlInsert);
				statement.executeUpdate(sqlInsert);
				resMsg = 2;//注册成功
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Gson gson = new Gson();
		String info = gson.toJson(resMsg);
		System.out.println(info);
		out.write(info);
	}
	
	

}
