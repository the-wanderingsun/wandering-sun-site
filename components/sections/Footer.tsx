export default function Footer() {
  return (
    <footer id="footer">
      <div>
        <div className="footer-tagline">
          STAY<em>WILD.</em>
        </div>
        <div className="footer-contacts">
          <div className="footer-contact-item">
            <span className="footer-contact-label">小红书</span>
            <a href="#" className="footer-contact-value">太阳在世界游荡</a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">PODCAST</span>
            <a href="#" className="footer-contact-value">太阳在世界游荡</a>
          </div>
          <div className="footer-contact-item">
            <span className="footer-contact-label">TELEGRAM</span>
            <a href="https://t.me/Wandering_sun" className="footer-contact-value">@Wandering_sun</a>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <p className="footer-quote">
          在流动中工作，在创作里认识自己。<br />
          游荡不是逃离，是一种认识方式。
        </p>
        <div className="footer-links">
          <a href="#">INSTAGRAM</a>
          <a href="#">NEWSLETTER</a>
          <a href="#">RSS</a>
        </div>
        <p className="footer-copy">© 2024 WANDERING SUN · VOYAGE EVERYWHERE</p>
      </div>
    </footer>
  )
}
