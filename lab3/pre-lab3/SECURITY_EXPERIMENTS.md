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