import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import PeoplePrimary from "./PeoplePrimary";
import PeopleSecondary from "./PeopleSecondary";
import NeverMIssSection from "./NeverMIssSection";
import FadeInWhenVisible from "./Fade";
import SpeakSection from "./SpeakSection";
import KeepInTouch from "./KeepInTouch";
import WhatYouFeel from "./WhatYouFeel";
import TransformBusiness from "./TransformBusiness";
import Footer from "./Footer";

const Homepage = () => {
  return (
    <div className="bg-green-100">
      {/* navbar */}
      <NavBar />
      {/* hero */}
      <HeroSection />
      <PeoplePrimary />
      <FadeInWhenVisible>
        <p className="text-center py-16 text-xl md:text-4xl font-semibold px-4 md:px-12 container">
          With private messaging and calling, you can be yourself, speak freely
          and feel close to the most important people in your life no matter
          where they are.
        </p>
      </FadeInWhenVisible>
      <PeopleSecondary />
      <NeverMIssSection />
      <SpeakSection />
      <KeepInTouch />
      <WhatYouFeel />
      <TransformBusiness />
      <Footer />
    </div>
  );
};

export default Homepage;
