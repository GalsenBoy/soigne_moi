import "./footer.scss";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <h3>&copy; {year} Soigne Moi</h3>
    </footer>
  );
}
