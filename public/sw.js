self.addEventListener('activate', event => event.waitUntil(clients.claim()));

self.addEventListener('push', event => event.waitUntil(handlePushEvent(event)));

self.addEventListener('notificationclick', event => event.waitUntil(handleNotificationClick(event)));

self.addEventListener('notificationclose', event => console.info('notificationclose event fired'));



async function handlePushEvent(event) {
	console.info('push event emitted');

//  const needToShow = await needToShowNotification();
const needToShow = true;
  const dataCache = await caches.open('data');

  if (!event.data) {
    console.info('number fact received');

    if (needToShow) {
      self.registration.showNotification('Numbers API', {
        body: 'A new fact has arrived',
        tag: 'numberfact',
        icon: 'numbers.png'
      });
    }

    const response = await fetch('http://localhost:8080/lastNumbersAPIFact');
    const fact = await response.text();

    await dataCache.put('fact', new Response(fact));
  }
  else {
	  console.info('chuck joke received');

    const msg = event.data.json();
    console.log(msg)
    if (needToShow) {
      self.registration.showNotification(msg.title, {
        body: msg.body,
        image: msg.image,
        icon: "relief.png",
        actions: [
            { "action": "yes", "title": "I'm on It" },
            { "action": "no", "title": "Skip for Now" }
          ]
      });
    }

    await dataCache.put('joke', new Response(msg.body));
  }

  const allClients = await clients.matchAll({ includeUncontrolled: true });
  for (const client of allClients) {
    client.postMessage('data-updated');
  }
}


const urlToOpen1 = new URL('/index.html', self.location.origin).href;
const urlToOpen2 = new URL('/', self.location.origin).href;

async function handleNotificationClick(event) {

  let openClient = null;
  console.info('Notification action: ', event.action);
  //self.location.href("http://localhost:3000/welcome");
  
  
  if (!event.action) {
      console.log('Notification Click.');
      return;
    }
    await self.registration.pushManager.getSubscription().then(response=>{
      console.info(response);
      subscription = response;
      console.info('ENDPOINT: ',response.endpoint);
    })
//    console.info('Subscription Endpoint',this.publicSigningKey);
     switch(event.action){
        case 'yes':
          console.info('Yes Selected');
          let url = 'https://grads-coding-group-24.uc.r.appspot.com/timer/';
          event.notification.close(); // Android needs explicit close.
          
          event.waitUntil(
              clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
        break;
        case 'no':
        console.info('No Selected');
          // await fetch("http://localhost:8080/activitySkipped", {
          //               method: 'POST',
          //               body: JSON.stringify(subscription),
          //               headers: {
          //                 "content-type": "application/json"
          //               }
          //             });
        break;

      }
//  await fetch("/subscribe", {
//      method: 'POST',
//      body: JSON.stringify(subscription),
//      headers: {
//        "content-type": "application/json"
//      }
//    });

  // const allClients = await clients.matchAll({ includeUncontrolled: true, type: 'window' });
  // for (const client of allClients) {
  //   if (client.url === urlToOpen1 || client.url === urlToOpen2) {
  //     openClient = client;
  //     break;
  //   }
  // }

  // if (openClient) {
  //   await openClient.focus();
  // } else {
  //   await clients.openWindow(urlToOpen1);
  // }

  event.notification.close();
}

async function needToShowNotification() {
  const allClients = await clients.matchAll({ includeUncontrolled: true });
  for (const client of allClients) {
    if (client.visibilityState === 'visible') {
      return true;
    }
  }
  return true;
}
//self.addEventListener('notificationclick', function(event) {
//
//}
//);
