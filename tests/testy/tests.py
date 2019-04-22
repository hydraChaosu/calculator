from selenium import webdriver
import unittest
import time
from selenium.webdriver.common.by import By


class CalcTest(unittest.TestCase):

    def test1(self):
        baseurl = "http://192.168.8.116:3000/"
        driver = webdriver.Chrome()
        driver.maximize_window()
        driver.implicitly_wait(10)
        driver.get(baseurl)

        button1 = driver.find_element(
            By.XPATH, "//div[@class='calc']/button[1]")
        button8 = driver.find_element(
            By.XPATH, "//div[@class='calc']/button[8]")
        buttonplus = driver.find_element(
            By.XPATH, "//div[@class='calc']/button[12]")
        buttonEQ = driver.find_element(
            By.XPATH, "//div[@class='calc']/button[16]")
        result = driver.find_element(By.CLASS_NAME, 'showValue')
        button1.click()
        time.sleep(1)
        buttonplus.click()
        time.sleep(1)
        button8.click()
        time.sleep(1)
        buttonEQ.click()
        print(result.text)
        self.assertEqual('9', result.text, 'wynik jest ok')
        time.sleep(10)
