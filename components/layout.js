import Navbar from "./navbar";
import Footer from "./footer";
import { Container } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <Container maxW="container.xl">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Container>
  );
}
