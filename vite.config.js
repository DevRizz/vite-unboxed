import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { qrcode } from 'vite-plugin-qrcode'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/

/*we can also extend our pluggings using vite-pluggings installation
npm install -D vite-plugin-qrcode like this we have added as dev dependency means it is only for development
and build not for the production we can either write '-D' or '--save-dev', both says its for the development/build*/

//one more thing to do is to change the script of dev from 'vite' to 'vite --host' 
//and we can also specify the ip address manually like 'vite --host 0.0.0.0', we use host so that
//it binds our computer ip with the port number to access the qr code from other devices like mobile only because may be the qr
//code pluggin doesnot generate any scannable ip because vite isn't exploring any ip
export default defineConfig({

  //i have also added the pwa (progressive web app) plugin as well
  plugins: [react(), qrcode(), 
    VitePWA({
      //this will make sure the app auto updates when you push changes
      registerType: 'autoUpdate',
      //this will load the plugin in the dev mode
      devOptions: {
        enabled: true // this is very critical
      },
      //this is the manifest that describes my application how it looks when someone install my app
      manifest: {
        name: "MyWebSite",
        short_name: "MySite",
        start_url: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42b883',
        //to generate the assest not manually then use npm i @vite-pwa/assets-generator -D
        //this will also give us the json format for the img added in our assest folder of type you want like
        //now i set it to solo.jpg and output it to public dir using command npx vite-pwa-assets-generator --input src/assets/Solo.jpg --output public
        
        //if that doesnot work then use https://realfavicongenerator.net/ and extract the zip file images in public directly: simple approach
        //in the site.webmanifest everything is there in form of json just copy paste it here
        icons: [
          {
            src: "/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable"
          },
          {
            src: "/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
     /* manifest: './manifest.webmanifest',
     injectRegister: 'auto', */ // injectRegister will directly inject the manifest to our code or manually we can also see the same in the index.html as <link rel="manifest" href="/manifest.webmanifest" />
    }),
  ],

  /* server: {
    host: true // Needed for QRCode plugin to expose IP
  }, */
  //also we can set our server here to any port we want
  // also this open is automatically open our localhost:3000 on web browser when set to true
  // server: {
  //   port: 3000,
  //   open: true,
  // },

  //now i need to change my build directory from dist to out
  build: {
    outDir: './out'
  }
})
