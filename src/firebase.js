import firebase from 'firebase'

const firebaseConfig = {
  apiKey: 'AIzaSyBANpjxc4pTqFCbchXt_XJWaV6s1eBs3Ds',
  authDomain: 'xfive-robertgrzonka.firebaseapp.com',
  databaseURL: 'https://xfive-robertgrzonka.firebaseio.com',
  projectId: 'xfive-robertgrzonka',
  storageBucket: '',
  messagingSenderId: '909177806348',
  appId: '1:909177806348:web:75742c2fb0b143c13f1829'
}

const config = firebase.initializeApp(firebaseConfig)

export default config
