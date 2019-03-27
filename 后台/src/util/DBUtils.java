package util;

import java.sql.DriverManager;
import java.sql.SQLException;

import com.mysql.jdbc.Connection;

public class DBUtils {
	// table
	public static final String USERS = "users";//�����ݿ��еı���ȫ����Ϊȫ�ֳ��������ڸ���ҳ�����
	public static final String GOODS = "goods";
	public static final String ORDERING = "ordering";
	public static final String CONNECT = "connect";
	public static final String CAR = "car";
	public static final String PICTURES = "pictures";
	public static final String REVIEWS = "reviews";
 
	// connect to MySql database
	public static Connection getConnect() {
		String url = "jdbc:mysql://localhost:3306/onlineshopping?characterEncoding=utf8"; // ���ݿ��Url
		Connection connecter = null;
		try {
			Class.forName("com.mysql.jdbc.Driver"); // java���䣬�̶�д��
			connecter = (Connection) DriverManager.getConnection(url, "root", "123");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			System.out.println("SQLException: " + e.getMessage());
			System.out.println("SQLState: " + e.getSQLState());
			System.out.println("VendorError: " + e.getErrorCode());
		}
		return connecter;
	}
}