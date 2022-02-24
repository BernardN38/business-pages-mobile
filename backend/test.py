try:
    from app import app
    import unittest
except Exception as e:
    print(f'some modules missing {e}')



class FlaskTest(unittest.TestCase):
    def test_index(self):
        tester = app.test_client(self)
        response = tester.get('/')
        self.assertEqual(response.status_code, 200)

    # check if content is applicaiton/json
    def test_index_content(self):
        tester = app.test_client(self)
        response = tester.get('/')
        self.assertEqual(response.content_type, 'text/html; charset=utf-8')

  




if __name__ == "__main__":
    unittest.main()