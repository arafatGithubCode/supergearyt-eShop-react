import Container from "./ui/Container";
import Footer from "./ui/Footer";
import Header from "./ui/Header";

function App() {
  return (
    <>
      <main>
        <Header />
        <Container>
          <p>body</p>
        </Container>
        <Footer />
      </main>
    </>
  );
}

export default App;
