// import React, { useEffect } from 'react';
// declare const DojahWidget: any; // Declare DojahWidget globally
// const LivenessWidget: React.FC = () => {
//   useEffect(() => {
//     const loadDojahScript = () => {
//       const existingScript = document.querySelector("script[src='https://widget.dojah.io/widget.js']");
//       if (!existingScript) {
//         const script = document.createElement('script');
//         script.src = 'https://widget.dojah.io/widget.js';
//         script.async = true;
//         script.onload = () => {
//           if (typeof DojahWidget !== 'undefined') {
//             const dojahWidget = new DojahWidget({
//                 app_id: '675ad77cb10ea7e00ef136ae',
//                 public_key: 'test_pk_cLUDGMLCVPxeKtM4swsfiGHL6',
//                 type: 'liveness',
//                 onSuccess: (data: any) => {
//                     console.log('Liveness check successful:', data);
//                 },
//                 onError: (error: any) => {
//                     console.error('Liveness check failed:', error);
//                 },
//                 });
//                 dojahWidget.open();
//           } else {
//             console.error('DojahWidget is not defined.');
//           }
//         };
//         script.onerror = () => {
//           console.error('Failed to load Dojah Widget script.');
//         };
//         document.body.appendChild(script);
//       }
//     };

//     loadDojahScript();
//   }, []);

//   return <div id="dojah-container"></div>;
// };

// export default LivenessWidget;




// import React, { useEffect } from 'react';

// declare const DojahWidget: any; // Declare DojahWidget globally

// const LivenessWidget: React.FC = () => {
//   useEffect(() => {
//     const dojahWidget = new DojahWidget({
//         app_id: '675ad77cb10ea7e00ef136ae',
//         public_key: 'test_pk_cLUDGMLCVPxeKtM4swsfiGHL6',
//         type: 'liveness', // Specify the type of widget (liveness check)
//         onSuccess: (data: any) => {
//             console.log('Liveness check successful:', data);
//             alert('Liveness check passed!');
//         },
//         onError: (error: any) => {
//             console.error('Liveness check failed:', error);
//             alert('Liveness check failed. Please try again.');
//         },
//     });

//     dojahWidget.open();
//   }, []);

//   return <div id="dojah-container"></div>;
// };

// export default LivenessWidget;