# FamilySecure | Home Location 

![FamilySecure Banner](.jpeg)

A secure family location tracking system built with React, TypeScript, and Leaflet maps.

## 🌟 Features

### 🗺️ Real-time Location Tracking
- Interactive map interface with custom markers
- Real-time location updates for family members
- Battery level and device status monitoring
- Historical movement paths and patterns

### 🎯 Geo-Fencing
- Create circular geo-fences with customizable radius
- Set entry/exit notifications for specific family members
- Visual representation on the interactive map
- Active/inactive fence toggling

### 👥 Family Member Management
- Role-based access control (Admin, Family, Child)
- Device tracking and management
- Online/offline status monitoring
- Activity history and statistics

### 📊 Statistics & Analytics
- Distance traveled tracking
- Time spent at locations
- Battery level history
- Movement pattern analysis

### 🔔 Smart Notifications
- Geo-fence entry/exit alerts
- Battery level warnings
- Device offline notifications
- Real-time status updates

### ⚙️ Advanced Settings
- Security & privacy controls
- System configuration
- Database management
- Tracking preferences

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **Mapping**: Leaflet with React-Leaflet
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/odaysec/family-secure.git
cd family-secure
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_MAP_TILE_LAYER=https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
VITE_DEFAULT_CENTER_LAT=-6.2088
VITE_DEFAULT_CENTER_LNG=106.8456
```

## 🏗️ Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## 🚀 Deployment

### Netlify

1. Create a new site on Netlify
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy!

## 🔐 Security Features

- End-to-end encryption for location data
- Role-based access control
- Secure authentication system
- Privacy-focused data handling
- Customizable data retention policies

## 🎨 Customization

### Theme Colors

The project uses a cyberpunk theme with customizable colors in `tailwind.config.js`:

```javascript
colors: {
  'cyber-black': '#0c0c0f',
  'cyber-dark': '#121218',
  'cyber-gray': '#1e1e26',
  'cyber-light': '#2a2a36',
  'neon-green': '#00ff9d',
  'neon-blue': '#00f0ff',
  'alert-red': '#ff355e',
  'alert-orange': '#ff9f1c'
}
```

## 📱 Mobile Responsiveness

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenStreetMap for map tiles
- React and TypeScript communities
- All contributors and users

## 📞 Contact

- GitHub: [@odaysec](https://github.com/odaysec)

## 🌟 Support

If you found this project helpful, please give it a ⭐️ on GitHub!
