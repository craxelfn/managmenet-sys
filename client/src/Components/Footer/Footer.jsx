import React from 'react';
import './Footer.css'; 
import logo from '../../assets/laram.png' ;
import email_icon from '../../assets/email.png' ;

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col">
          <img src={logo} className="logo m-auto" alt="Royal Air Maroc logo" />
          <ul>
            <p className='text-center h2'>Royal Air Maroc</p>
            <p className='text-center h5'>Compagnie Nationale du Maroc.</p>
            <li>
              <img src={email_icon} alt="" />
              <p>Adresse: Aéroport Mohammed V – Nouasseur, Casablanca, Maroc.</p>
            </li>
            <li>
                <img src={email_icon} alt="" />
              <p>Tel: +212 5 22 48 97 97</p>
            </li>
            <li>
              <img src={email_icon} alt="" />
              <p>Fax: +212 5 22 53 93 09</p>
            </li>
            <li>
              <img src={email_icon} alt="" />
              <p>Email: contact@royalairmaroc.com</p>
            </li>
          </ul>
        </div>
        <div className="col text-center">
          <h3>Liens Utiles</h3>
          <a href="/home"><p>Accueil</p></a>
          <a href="/book"><p>Réservation</p></a>
          <a href="/services"><p>Services</p></a>
          <a href="/contact"><p>Contact</p></a>
        </div>
        <div className="col">
          <h3>Newsletter</h3>
          <p>Abonnez-vous à notre newsletter pour recevoir les dernières actualités et offres spéciales de Royal Air Maroc.</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/royalairmaroc/"><img src="" alt="" /></a>
            <a href="https://twitter.com/royalairmaroc"><img src="" alt="" /></a>
            <a href="https://www.instagram.com/royalairmaroc/"><img src="" alt="" /></a>
            <a href="https://www.linkedin.com/company/royal-air-maroc/"><img src="" alt="" /></a>
          </div>
        </div>
      </div>
      <hr />
      <p className="copyright">© 2024 Royal Air Maroc.</p>
    </footer>
  );
}

export default Footer;
