import React from "react";
import { useSpring, animated } from "react-spring";
import tw from "twin.macro";

const Container = tw.div`max-w-4xl mx-auto`;

const Header = tw.header`flex justify-between py-8 px-4 bg-blue-700 text-white`;

const Logo = tw.h1`text-3xl font-bold uppercase`;

const Nav = tw.nav`flex items-center text-sm`;

const NavItem = tw.a`ml-8 font-medium text-white hover:underline cursor-pointer`;

const SearchContainer = tw.div`flex items-center text-sm border-b-2 border-white`;

const SearchInput = tw.input`bg-transparent border-none text-white p-2 py-3 pr-4`;

const SearchIcon = tw.i`text-lg text-white`;

const HeroSection = tw.section`py-12 px-4 flex justify-center items-center`;

const HeroContainer = tw.div`max-w-2xl`;

const HeroTitle = tw.h2`text-4xl font-semibold leading-tight mb-4`;
const HeroDescription = tw.p`text-lg font-medium text-gray-700 mb-6`;
const SignUpButton = tw.a`inline-block bg-blue-700 hover:bg-blue-800 text-white font-medium rounded py-3 px-8`;

const FeatureSection = tw.section`py-12 px-4`;

const FeatureContainer = tw.div`flex justify-between flex-wrap -mx-4`;

const Feature = tw.div`w-full md:w-1/3 px-4 mb-12`;

const FeatureIcon = tw.i`text-5xl text-blue-700 mb-8`;

const FeatureTitle = tw.h3`text-2xl font-semibold leading-tight mb-2`;

const FeatureDescription = tw.p`text-lg font-medium text-gray-700`;

const FooterSection = tw.footer`py-8 px-4 flex justify-between items-center text-sm border-t border-gray-300`;

const FooterLinks = tw.ul`flex justify-center`;

const FooterLink = tw.a`ml-4 hover:text-blue-700`;

const SocialLinks = tw.div`flex items-center text-xl`;

const SocialLink = tw.a`ml-4 text-blue-700 hover:text-blue-800 transform hover:scale-125 transition duration-300`;

const animationProps = {
  opacity: 1,
  transform: "translateX(0px)",
  from: { opacity: 0, transform: "translateX(-100px)" },
};

export default function Test() {
  const [searchValue, setSearchValue] = React.useState("");

  const searchSpring = useSpring(animationProps);

  const featureSprings = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(50px)" },
  });

  const footerLinkSprings = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  const socialLinkSprings = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 800,
  });

  return (
    <Container>
      <Header>
        <Logo>Facebook</Logo>
        <Nav>
          <NavItem>Home</NavItem>
          <NavItem>Profile</NavItem>
          <NavItem>Messages</NavItem>
        </Nav>
        <SearchContainer>
          <animated.div style={searchSpring}>
            <SearchInput
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchIcon className="fas fa-search" />
          </animated.div>
        </SearchContainer>
      </Header>
      <HeroSection>
        <HeroContainer>
          <HeroTitle>Connect with friends and the world around you on Facebook.</HeroTitle>
          <HeroDescription>See photos and updates from friends in News Feed.</HeroDescription>
          <SignUpButton>Sign Up</SignUpButton>
        </HeroContainer>
      </HeroSection>
      <FeatureSection>
        <FeatureContainer>
          <animated.div style={featureSprings}>
            <Feature>
              <FeatureIcon className="fas fa-newspaper" />
              <FeatureTitle>News Feed</FeatureTitle>
              <FeatureDescription>Get updates from your friends.</FeatureDescription>
            </Feature>
            <Feature>
              <FeatureIcon className="fas fa-comments" />
              <FeatureTitle>Messaging</FeatureTitle>
              <FeatureDescription>Chat with your friends and groups.</FeatureDescription>
            </Feature>
            <Feature>
              <FeatureIcon className="fas fa-lock" />
              <FeatureTitle>Privacy</FeatureTitle>
              <FeatureDescription>Your information is secure on Facebook.</FeatureDescription>
            </Feature>
          </animated.div>
        </FeatureContainer>
      </FeatureSection>
      <FooterSection>
        <FooterLinks>
          <animated.li style={footerLinkSprings}>
            <FooterLink>About Us</FooterLink>
          </animated.li>
          <animated.li style={footerLinkSprings}>
            <FooterLink>Contact Us</FooterLink>
          </animated.li>
          <animated.li style={footerLinkSprings}>
            <FooterLink>Terms of Use</FooterLink>
          </animated.li>
          <animated.li style={footerLinkSprings}>
            <FooterLink>Privacy Policy</FooterLink>
          </animated.li>
        </FooterLinks>
        <animated.div style={socialLinkSprings}>
          <SocialLinks>
            <SocialLink href="#">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="#">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#">
              <i className="fab fa-instagram"></i>
            </SocialLink>
          </SocialLinks>
        </animated.div>
      </FooterSection>
    </Container>
  );
}