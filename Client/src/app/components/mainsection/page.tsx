"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import React from "react";
import Image from "next/image";
import Card from "react-bootstrap/Card";

function MainSection() {
  return (
    <div >   
      <Image
        priority={true}
        src={"/dashimages/1st.jpg"}
        width={1000}
        height={1000}
        sizes="100vw"
        style={{
          color: "transparent",
          width: "100%",
          height: "auto",
          filter: "invert(0)",
        }}
        alt="Picture of the author"
      />

      <div className="text-center m-5">
        <h1>Welcome to CloudStore</h1>
        <p>
          We bring together the best products from around the world. Shop with
          confidence, knowing that each item is selected for its quality,
          style, and uniqueness Your satisfaction is our priority. Benefit
          from fast and reliable shipping services, ensuring your purchases
          reach you in perfect condition and on time Have questions or need
          assistance? Our dedicated customer support team is here to help.
          We're committed to providing you with excellent service at every
          step of your shopping journey Shop with confidence knowing that your
          transactions are secure. We prioritize your privacy and use advanced
          security measures to protect your personal information.
        </p>
      </div>

      <div className="centre row m-5">
        <Card className="m-1" style={{ width: "22rem" }}>
          <Card.Img
            variant="top"
            style={{ height: "240px", padding: "0" }}
            src={"/dashimages/4th.jpg"}
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="m-1" style={{ width: "22rem" }}>
          <Card.Img
            variant="top"
            style={{ height: "240px", padding: "0" }}
            src={"/dashimages/2nd.jpg"}
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="m-1" style={{ width: "22rem" }}>
          <Card.Img
            variant="top"
            style={{ height: "240px", padding: "0" }}
            src={"/dashimages/3rd.jpg"}
          />
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>

      <div className="text-center m-5">
        <h1>Welcome to CloudStore</h1>
        <p>
          We bring together the best products from around the world. Shop with
          confidence, knowing that each item is selected for its quality,
          style, and uniqueness Your satisfaction is our priority. Benefit
          from fast and reliable shipping services, ensuring your purchases
          reach you in perfect condition and on time Have questions or need
          assistance? Our dedicated customer support team is here to help.
          We're committed to providing you with excellent service at every
          step of your shopping journey Shop with confidence knowing that your
          transactions are secure. We prioritize your privacy and use advanced
          security measures to protect your personal information.
        </p>
      </div>

      <Accordion className="container" defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>About the side</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Products</Accordion.Header>
          <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div
        style={{
          background: "black",
          position: "relative",
          top: "10px",
          paddingTop: "0.06px",
        }}
      ></div>
    </div>
  );
}

export default MainSection;
