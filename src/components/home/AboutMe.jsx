import React, { useState, useEffect } from "react";
import axios from "axios";
import { Jumbotron } from "./migration";

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [showPic, setShowPic] = useState(Boolean(link));

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animatedText, setAnimatedText] = useState('');

  useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  useEffect(() => {
    let intervalId;

    if (currentMessageIndex < message.length) {
      const currentWords = message[currentMessageIndex]?.split(' ') || [];

      intervalId = setInterval(() => {
        if (currentWordIndex < currentWords.length) {
          setAnimatedText(prevText => prevText + currentWords[currentWordIndex] + ' ');
          setCurrentWordIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(intervalId);
          setCurrentMessageIndex(prevIndex => prevIndex + 1);
          setCurrentWordIndex(0);
          setAnimatedText('');
        }
      }, 100);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [currentMessageIndex, currentWordIndex, message]);


  return (
    <Jumbotron id="aboutme" className="m-0">
      <div className="container row">
        <div className="col-5 d-none d-lg-block align-self-center">
          {showPic && (
            <img
              className="border border-secondary img-fluid rounded-circle"
              src={profilePicUrl}
              alt="profilepicture"
              style={{ maxWidth: "100%" }}
            />
          )}
        </div>
        <div className={`col-lg-${showPic ? "7" : "12"}`}>
          <h2 className="display-4 mb-5 text-center">{heading}</h2>
          {message.slice(0, currentMessageIndex).map((msg, index) => (
            <p key={index} className="lead text-center" dangerouslySetInnerHTML={{ __html: msg }} />
          ))}
          <p className="lead text-center" dangerouslySetInnerHTML={{ __html: animatedText }} />
          {resume && (
            <p className="lead text-center">
              <a
                className="btn btn-outline-dark btn-lg"
                href={resume}
                target="_blank"
                rel="noreferrer noopener"
                role="button"
                aria-label="Resume/CV"
              >
                Resume
              </a>
            </p>
          )}
        </div>
      </div>
    </Jumbotron>
  );
};

export default AboutMe;
