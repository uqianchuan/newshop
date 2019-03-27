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

@WebServlet("/Login")//����ע�⣬�ҵ�������൱��һ��ָ��꣬��ǰ�˵�post��url�����Ӧ�������ܹ�ֱ���ҵ�����ִ࣬���书��

public class Login extends HttpServlet{
	
	private static final long serialVersionUID = 1L;

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		doPost(request,response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {//����doPost����
		// TODO Auto-generated method stub
		response.setHeader("Access-Control-Allow-Origin", "*");//�˴��������ã���������ֵ��ͷ�ļ�����Access-Control-Allow-Origin����������
		//ͬԴ��ֹ��������������㷵�ص���Ϣ���ݣ�ʵ�ֲ��˿�����Ĺ���
		
		String account = request.getParameter("account");//����ǰ�˴��ص�account�ַ���������������account��
		String password = request.getParameter("password");//ͬ�����մ��ص�password�ַ���,����������password��
		int resMsg = 0;//����һ��int��������¼�㷵�ص���Ϣ
		
		response.setContentType("text/html");//���ñ������ݣ�����ǰ��htmlҳ������
		response.setCharacterEncoding("utf-8");//�ַ�����Ϊutf-8���������ã�����ǰ�˽��յ��������ݿ������������ʽ���ֳ���
		PrintWriter out = response.getWriter();//����io��������д��ǰ��
		
		
		try {
			Connection connect = DBUtils.getConnect();//�������ݿ�
			Statement statement = (Statement) connect.createStatement();//���ù���ģʽʵ�������ݿ�����
			ResultSet result;//����һ���������ݿⷵ��ֵ�ı���
			
			String sqlQuery = "select * from " + DBUtils.USERS + " where login_id='" + account + "'";//���ݿ��ѯ��������
			
			result = statement.executeQuery(sqlQuery);//ִ�в�ѯ���Բ�����ִ�н��
			
			if(result.next()){//�������ֵΪtrue����˵�����ݿ���ڸ��˺�
				
				if(result.getString("login_password").equals(password)){//�жϷ���ֵ�е������ֶ������Ƿ����ϴ�����������һ��
					
					resMsg = 1;//���������1��������½�ɹ�
				}else{
					
					resMsg = 2;//�����������2�������������
				}
				
			}else{
				
				resMsg = 3;//������Ϊflase����������ݿ����޴����ݣ����˺Ų�����
			}
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		Gson gson = new Gson();//����һ��Gson�������ڴ���һЩ�򵥵�ֵ��ǰ��
		
		String info = gson.toJson(resMsg);//������ı�����ݴ���Gson��
		
		System.out.println(info);
		
		out.write(info);//��io��д��ǰ��
		
	}
	
	

}
