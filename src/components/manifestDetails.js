const manifestDetails = {
    "name": process.env.REACT_APP_NAME,
    "short_name": process.env.REACT_APP_NAME,
    "start_url":  `${window.location.href}`,
    "display": "standalone",
    "theme_color": "#ffffff",
    "background_color": "#ffffff",
    "icons": [
      {
        "src": `${process.env.REACT_APP_LOGO}/favicon.ico`,
        "sizes": "48x48",
        "type": "image/x-icon"
      },
      {
          "src": `${process.env.REACT_APP_LOGO}/android-chrome-192x192.png`,
          "sizes":"192x192",
          "type":"image/png"
      },
      {
          "src": `${process.env.REACT_APP_LOGO}/android-chrome-512x512.png`,
          "sizes":"512x512",
          "type":"image/png"
      }
  ],
  "screenshots": [
      {
        "src": `${process.env.REACT_APP_LOGO}/screenshot.png`,
        "type": "image/png",
        "sizes": "378x669",
        "form_factor": "wide"
      },
      {
        "src": `${process.env.REACT_APP_LOGO}/screenshot.png`,
        "type": "image/png",
        "sizes": "378x669"
      }
    ]
  };

  export default manifestDetails