Experiment 1: SQL Injection
<!-- รันตอนแรก Postman -> localhost:3001/login error this logs

***
TypeError: Cannot destructure property 'username' of 'req.body' as it is undefined.
    at C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\experiment1\vulnerable-server.js:14:13
    at Layer.handleRequest (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\lib\layer.js:152:17)
    at next (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\lib\route.js:157:13)
    at Route.dispatch (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\lib\route.js:117:3)
    at handle (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\index.js:435:11)
    at Layer.handleRequest (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\lib\layer.js:152:17)
    at C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\index.js:295:15
    at processParams (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\index.js:582:12)
    at next (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\router\index.js:291:5)
    at serveStatic (C:\Users\JrKh1\Documents\GitHub\engse214-665432100071\lab3\pre-lab3\node_modules\serve-static\index.js:74:16)
***
แก้ไข postman -> post domain raw {username,password} -->

ผลการทดลอง http://localhost:3001/index.html
username admin';--
password ' OR '1='1';-- || UNION SELECT 1,2,3,4;--
สามารถเข้าสู่ระบบได้ทั้งหมดทุกรหัสที่กล่าวมา ( Login successful! )
และlog แสดง query 

---
Experiment 2: XSS (Cross-Site Scripting) พื้นฐาน
ผลการทดลอง http://localhost:3002/index.html
Basic XSS: alert('XSS Attack!')
Image XSS:< src=x onerror=alert('XSS via IMG')>
Cookie Stealing: alert('Cookie: ' + document.cookie)
DOM Manipulation: document.body.style.backgroundColor='red'

---

Experiment 3: การป้องกันความปลอดภัย
ระบบที่มีการป้องกันตอบสนองต่อ SQL injection อย่างไร?
-> กันด้วย Prepared Statements (ใช้ ? แทนค่า ไม่เอาค่าไปต่อ string)
Input validation ป้องกันอะไรได้บ้าง?
-> กัน input แปลก ๆ เช่น ยาวเกิน, ไม่ใช่ string, มีคำสั่งต้องห้าม (DROP)
ความแตกต่างระหว่าง string concatenation กับ prepared statements คืออะไร?
-> Concatenation = เอาค่าไปต่อ string → เสี่ยงโดนเจาะ
-> Prepared = แยก “โค้ด SQL” ออกจาก “ค่า” → ปลอดภัย
HTML sanitization ทำงานอย่างไร?
-> แปลง < > & ' " เป็นตัวอักษรธรรมดา → script ไม่ทำงาน → กัน XSS
การป้องกันแบบไหนที่มีประสิทธิภาพมากที่สุด?
-> ต้องใช้ หลายชั้น เช่น Validation + Prepared Statements + Sanitization + Security Headers

***

Experiment 4: Password Security
ทำไม Plain Text ถึงอันตราย?
-> เข้าถึงง่าย ตรวจสอบ/บังคับใช้ความปลอดภัยไม่ได้ ไม่เป็นไปตามมาตรฐาน
ความแตกต่างระหว่าง MD5 กับ SHA-256 คืออะไร?
-> ความแข็งแรง: MD5 (128 บิต) ถูกพิสูจน์ว่ามี “collision” ได้ง่ายและแตกแล้วเชิงปฏิบัติ; SHA-256 (256 บิต) ยังไม่พบการชนกันเชิงปฏิบัติ
Salt ช่วยป้องกันอะไร?
-> ป้องกัน rainbow table ทำให้ hash ไม่ซ้ำ
ลองใส่รหัสผ่านเดียวกันใน Salted Hash หลายครั้ง ผลลัพธ์เป็นอย่างไร?
-> ผลต่างกันทุกครั้ง
รหัสผ่านที่แข็งแรงควรมีองค์ประกอบอะไรบ้าง?
-> ใช้อย่างน้อย 8 ตัวอักษร (a-z) (A-Z) (0-9) อักขรพิเศษ

***

Step 5.1: สร้างเซิร์ฟเวอร์ HTTP และ HTTPS
รัน: node experiment5/network-demo.js (ดูผลใน console)
-> 🚨 HTTP (Vulnerable):
  1. User sends: POST /login {"username":"john","password":"secret123"}
  2. Attacker sees: Plain text data
  3. Attacker captures: Username=john, Password=secret123
  4. Result: ❌ CREDENTIALS STOLEN!
🔒 HTTPS (Protected):
  1. User sends: Encrypted TLS data
  2. Attacker sees: Random encrypted bytes
  3. Attacker captures: Unreadable encrypted data
  4. Result: ✅ CREDENTIALS PROTECTED
รัน: node experiment5/http-server.js (terminal 1)
-> เตื่อนไม่ปลอดภัย
รัน: node experiment5/https-server.js (terminal 2)
-> เมื่อรัน จะมี key CERTIFICATE cert.pem && key.pem
เปิด http://localhost:3005 (หรือใช้หน้าเว็บรวม)
ทดสอบการส่งข้อมูลทั้ง HTTP และ HTTPS
-> https HTTPS Response:
{
  "success": true,
  "message": "Login successful (HTTPS)",
  "security": "ข้อมูลถูกเข้ารหัส!"
}
✅ ปลอดภัย: ข้อมูลถูกเข้ารหัสระหว่างการส่ง!

http HTTP Response:
{
  "success": true,
  "message": "Login successful (HTTP)",
  "warning": "ข้อมูลไม่ได้เข้ารหัส!"
}
⚠️ คำเตือน: รหัสผ่านถูกส่งแบบ plain text!
บันทึกผลการทดลอง
-> https ปลอดภัยกว่า http เสียงโดน Man-in-the-Middle
***