# Account-flow

## เริ่มต้นใช้งาน

### ความต้องการของระบบ
- [Docker](https://www.docker.com/get-started) และ [Docker Compose](https://docs.docker.com/compose/install/)
- ไม่จำเป็นต้องติดตั้ง Node.js, Java, PostgreSQL ในเครื่องเพราะ Docker จะจัดการให้ทั้งหมด

### วิธีการเริ่มต้นใช้งาน

1. **Clone repository**
   ```bash
   git clone https://github.com/pnxchet/account-flow.git
   cd account-flow
   ```

2. **เริ่มต้นระบบด้วย Docker Compose**
   ```bash
   docker-compose up -d
   ```
   หรือ
   ```bash
   docker compose up -d
   ```
   คำสั่งนี้จะ:
   - สร้างและเริ่มเซิร์ฟเวอร์ PostgreSQL
   - สร้างและเริ่มแอปพลิเคชัน Node.js และ Spring boot

3. **ตรวจสอบว่าระบบทำงานถูกต้อง**
   ```bash
   docker ps
   ```
   คุณควรจะเห็นคอนเทนเนอร์ 3 ตัว: `postgres`, `account-flow-backend` และ `account-flow-web`

## การแก้ไขปัญหา

### ปัญหา: คอนเทนเนอร์ไม่ทำงาน
- ตรวจสอบล็อกด้วยคำสั่ง: `docker logs <container_name>`
- ตรวจสอบว่าพอร์ต 80, 5432 และ 8080 ไม่ถูกใช้งานโดยโปรแกรมอื่น

### ปัญหา: อื่น ๆ
- ล้างข้อมูลและเริ่มต้นใหม่: `docker-compose down -v && docker-compose up -d` หรือ `docker compose down -v && docker compose up -d`

## การปิดการทำงาน

เมื่อต้องการหยุดการทำงานของระบบ:
```bash
docker-compose down
```
หรือ
```bash
docker compose down
```

ถ้าต้องการลบข้อมูลทั้งหมดและเริ่มต้นใหม่:
```bash
docker-compose down -v
```
หรือ
```bash
docker compose down -v
```

## API Document
หลังจากระบบเริ่มทำงาน สามารถดู API Documentได้ที่
[Swagger](http://localhost:8080/swagger-ui/index.html)