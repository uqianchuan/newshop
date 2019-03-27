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

@WebServlet("/Login")//加入注解，我的理解是相当于一个指向标，与前端的post的url编码对应，让其能够直接找到这个类，执行其功能

public class Login extends HttpServlet{
	
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		doPost(request,response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {//定义doPost方法
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");//此处必须设置，即将返回值的头文件加入Access-Control-Allow-Origin，否则会出现
		//同源禁止错误，浏览器拦截你返回的信息内容，实现不了跨域传输的功能
		
		String account = request.getParameter("account");//接收前端传回的account字符串，将其存入变量account中
		String password = request.getParameter("password");//同理，接收传回的password字符串,将其存入变量password中
		int resMsg = 0;//定义一个int变量，记录你返回的信息
		
		response.setContentType("text/html");//设置编码内容，即给前端html页面编码的
		response.setCharacterEncoding("utf-8");//字符编码为utf-8，必须设置，否则前端接收的中文内容可能以乱码的形式表现出来
		PrintWriter out = response.getWriter();//创建io流，用于写回前端
		
		
		try {
			Connection connect = DBUtils.getConnect();//连接数据库
			Statement statement = (Statement) connect.createStatement();//利用工厂模式实例化数据库连接
			ResultSet result;//定义一个接收数据库返回值的变量
			
			String sqlQuery = "select * from " + DBUtils.USERS + " where login_id='" + account + "'";//数据库查询语言描述
			
			result = statement.executeQuery(sqlQuery);//执行查询语言并返回执行结果
			
			if(result.next()){//如果返回值为true，则说明数据库存在该账号
				
				if(result.getString("login_password").equals(password)){//判断返回值中的密码字段内容是否与上传上来的密码一样
					
					resMsg = 1;//如果是则标记1，表明登陆成功
				}else{
					
					resMsg = 2;//如果不是则标记2，表明密码错误
				}
				
			}else{
				
				resMsg = 3;//如果结果为flase，则表明数据库中无此数据，即账号不存在
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Gson gson = new Gson();//创建一个Gson对象，用于传回一些简单的值给前端
		
		String info = gson.toJson(resMsg);//将上面的标记内容存入Gson中
		
		System.out.println(info);
		
		out.write(info);//以io流写入前端
		
	}
	
	

}
