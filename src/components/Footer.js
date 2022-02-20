const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <span>&copy;{year}&nbsp;약을먹는자</span>
      <br />
      <span>
        Loading page vector created by <a href="https://www.freepik.com/vectors/background">rawpixel.com</a>
      </span>
    </div>
  );
};

export default Footer;
