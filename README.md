# Fall Detection Wearable Device

A comprehensive health monitoring system that combines wearable sensors with a real-time web dashboard for continuous patient monitoring. The system tracks heart rate, SpO2 levels, and provides fall detection capabilities using accelerometer and gyroscope data.

## 🏗️ System Architecture

The project consists of three main components:

### 1. **Arduino Wearable Device** (`/arduino`)
- **Hardware**: ESP32-S3 microcontroller with integrated sensors
- **Sensors**:
  - MPU6050: 6-axis accelerometer/gyroscope for motion detection
  - MAX30102: Pulse oximeter and heart rate sensor
  - SSD1306: OLED display for real-time data visualization
- **Features**:
  - Real-time heart rate and SpO2 monitoring
  - Motion tracking with calibrated sensors
  - Wi-Fi connectivity for data transmission
  - Local OLED display with health metrics
  - Configurable alert thresholds

### 2. **Backend Server** (`/server`)
- **Technology**: Node.js with Express.js
- **Database**: MongoDB for data persistence
- **Real-time Communication**: Socket.IO for live data streaming
- **Features**:
  - RESTful API for data ingestion and retrieval
  - Real-time alert system with Telegram and WhatsApp integration
  - Data aggregation and analytics
  - User authentication and device management
  - Configurable alert rules and thresholds

### 3. **Web Dashboard** (`/dashboard`)
- **Technology**: Next.js 15 with React 19
- **Styling**: Tailwind CSS with Radix UI components
- **Features**:
  - Real-time health monitoring dashboard
  - Interactive charts and data visualization
  - Alert management and notifications
  - Device status monitoring
  - Historical data analysis
  - Responsive design for mobile and desktop

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB database
- Arduino IDE with ESP32 board support
- Wi-Fi network for device connectivity

### 1. Hardware Setup

#### Required Components:
- ESP32-S3 development board
- MPU6050 accelerometer/gyroscope
- MAX30102 pulse oximeter sensor
- SSD1306 OLED display (128x64)
- Connecting wires and breadboard

#### Wiring Diagram:
```
ESP32-S3  │  MPU6050  │  MAX30102  │  SSD1306
─────────────────────────────────────────────
GPIO 18   │  SDA      │  SDA       │  SDA
GPIO 20   │  SCL      │  SCL       │  SCL
3.3V      │  VCC      │  VIN       │  VCC
GND       │  GND      │  GND       │  GND
```

### 2. Backend Server Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your environment variables
nano .env
```

#### Required Environment Variables:
```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/fall-detection
DASHBOARD_ORIGIN=http://localhost:3000
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
TELEGRAM_BOT_TOKEN=your-telegram-bot-token
TELEGRAM_CHAT_ID=your-chat-id
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_FROM=whatsapp:+1234567890
ALERT_TO_WHATSAPP=whatsapp:+0987654321
```

```bash
# Start the development server
npm run dev

# Or start in production mode
npm start
```

### 3. Web Dashboard Setup

```bash
# Navigate to dashboard directory
cd dashboard

# Install dependencies
npm install

# Start the development server
npm run dev
```

The dashboard will be available at `http://localhost:3000`

### 4. Arduino Device Setup

1. **Install Required Libraries**:
   ```
   - MPU6050 by Electronic Cats
   - MAX30105lib by SparkFun
   - Adafruit GFX Library
   - Adafruit SSD1306
   - ArduinoJson
   - WiFi (ESP32 built-in)
   ```

2. **Configure Device Settings**:
   Open `/arduino/main/main.ino` and update:
   ```cpp
   const char* WIFI_SSID = "Your-WiFi-Network";
   const char* WIFI_PASSWORD = "Your-WiFi-Password";
   const char* API_HOST = "192.168.1.100"; // Your server IP
   const char* DEVICE_ID = "DEVICE001"; // Unique device identifier
   ```

3. **Upload Code**:
   - Connect ESP32-S3 to your computer
   - Select the correct board and port in Arduino IDE
   - Upload the code to the device

## 📊 Features

### Health Monitoring
- **Heart Rate**: Continuous BPM tracking with configurable thresholds
- **SpO2**: Blood oxygen saturation monitoring
- **Motion Detection**: 3-axis acceleration and gyroscope data
- **Fall Detection**: Algorithm-based fall detection using motion patterns

### Real-time Dashboard
- **Live Metrics**: Real-time display of vital signs
- **Historical Data**: Trend analysis and historical charts
- **Alert Management**: Configurable alerts with multiple notification channels
- **Device Status**: Monitor device connectivity and battery status
- **Multi-device Support**: Track multiple patients simultaneously

### Alert System
- **Threshold-based Alerts**: Configurable HR and SpO2 thresholds
- **Multi-channel Notifications**: Telegram, WhatsApp, and in-app alerts
- **Alert History**: Comprehensive logging of all alert events
- **Emergency Contacts**: Automatic notification to caregivers

### Data Management
- **RESTful API**: Complete API for data access and management
- **Real-time Sync**: Socket.IO for instant data updates
- **Data Aggregation**: Hourly, daily, and weekly analytics
- **Export Features**: Data export for external analysis

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh access token

### Devices
- `GET /api/devices` - List all devices
- `POST /api/devices` - Register new device
- `GET /api/devices/:id` - Get device details

### Readings
- `POST /api/readings` - Submit sensor data
- `GET /api/readings` - Get readings with filters
- `GET /api/readings/recent` - Get recent readings

### Alerts
- `GET /api/alerts` - List alerts
- `GET /api/alerts/recent` - Get recent alerts
- `POST /api/alerts/acknowledge` - Acknowledge alert

### Statistics
- `GET /api/stats/overview` - Dashboard overview stats
- `GET /api/stats/device/:id` - Device-specific statistics

## 🔧 Configuration

### Device Thresholds
```cpp
// In arduino/main/main.ino
const int HR_LOW = 45;    // Minimum heart rate (BPM)
const int HR_HIGH = 140;  // Maximum heart rate (BPM)
const int SPO2_LOW = 92;  // Minimum SpO2 percentage
```

### Server Configuration
```javascript
// In server/src/config.js
export default {
  port: process.env.PORT || 8080,
  mongoUri: process.env.MONGO_URI,
  // ... other configurations
};
```

### Dashboard Settings
The dashboard automatically connects to the backend server and displays real-time data through Socket.IO connections.

## 📱 Mobile Support

The web dashboard is fully responsive and optimized for mobile devices, allowing caregivers to monitor patients on-the-go.

## 🔐 Security Features

- JWT-based authentication
- Rate limiting on API endpoints
- CORS protection
- Input validation and sanitization
- Secure WebSocket connections

## 🚀 Deployment

### Production Deployment

1. **Backend Server**:
   ```bash
   # Build and start
   npm run start
   
   # Or use PM2 for process management
   pm2 start src/index.js --name fall-detection-server
   ```

2. **Dashboard**:
   ```bash
   # Build for production
   npm run build
   
   # Start production server
   npm start
   ```

3. **Database**:
   - Use MongoDB Atlas for cloud deployment
   - Or set up MongoDB on your server

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

## 📈 Monitoring and Analytics

The system provides comprehensive analytics including:
- Real-time vital sign trends
- Alert frequency analysis
- Device uptime monitoring
- Historical data comparison
- Threshold breach statistics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in each component's README
- Review the API documentation for integration details

## 🔮 Future Enhancements

- [ ] Machine learning-based fall detection algorithm
- [ ] GPS tracking for outdoor monitoring
- [ ] Voice alerts and commands
- [ ] Integration with healthcare systems (HL7 FHIR)
- [ ] Advanced analytics and predictive modeling
- [ ] Mobile companion app
- [ ] Multi-language support
- [ ] Cloud deployment templates

---

**Built with ❤️ for better healthcare monitoring**