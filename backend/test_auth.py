try:
    from app import app
    from auth_routes import auth
    import unittest
except Exception as e:
    print(f'some modules missing {e}')



app.register_blueprint(auth)   
class FlaskTest(unittest.TestCase):
    def test_auth_user_login(self):
        tester = app.test_client(self)
        response = tester.post('/login', data={"username":"eris","password":"password"})
        self.assertEqual(response.status_code, 200)

    def test_auth_user_login_header(self):
        tester = app.test_client(self)
        response = tester.post('/login', data={"username":"eris","password":"password"})
        self.assertTrue('Set-Cookie' in response.headers)
        self.assertTrue(len(response.headers['Set-Cookie'])>8)
  
    def test_auth_business_login(self):
        tester = app.test_client(self)
        response = tester.post('/business/login',data={'email':'test2@gmail.com',"password":"password"})
        self.assertEqual(response.status_code, 200)

    def test_auth_business_login_header(self):
        tester = app.test_client(self)
        response = tester.post('/business/login',data={'email':'test2@gmail.com',"password":"password"})
        self.assertTrue('Set-Cookie' in response.headers)
        self.assertTrue(len(response.headers['Set-Cookie'])>8)

if __name__ == "__main__":
    unittest.main()