---
layout: splash
title: "Contact"
permalink: /contact/
feature_row:
  - image_path_left: /assets/images/contactus.png
    alt_left: "Left Image"
    title_left: "Contact Us"
    excerpt_left: "We are ready to help your lab. Please send us a message below describing your needs and we would be happy to schedule a video call consultation."
  - image_path_right: /assets/images/contactinfo.png
    alt_right: "Right Image"
    title_right: "Contact Info"
---

<style>
  .feature-container {
    display: flex;
    justify-content: space-between;
  }

  .feature-row {
    margin-left: 0;
    position: relative;
  }

  .feature-row .header-content {
    color: #ffffff;
    padding: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .feature-row .header-content h1 {
    font-size: 3rem;
    margin: 0;
  }

  .feature-row .header-content p {
    font-size: 1.5rem;
    margin: 0;
  }

  .color-line {
    height: 100%;
    position: absolute;
    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #47e4e2;
  }

  .contact-info p {
    font-size: 0.9rem;
    color: #ffffff;
    white-space: nowrap;
  }

  .contact-form {
    background-color: #ffffff;
  }

  .contact-form label {
    display: block;
    margin-bottom: 0.5rem;
    color: #000000;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 2px solid #000000;
    background-color: transparent;
    color: #000000;
    box-shadow: none;
  }

  .contact-form input[type="submit"] {
    background-color: #47e4e2;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1rem;
    cursor: pointer;
  }

  .contact-form input[type="submit"]:hover {
    background-color: #31b2af;
  }
<style>
  .feature-container {
    display: flex;
    justify-content: space-between;
  }

  .feature-row {
    margin-left: 0;
    position: relative;
  }

  .feature-row .header-content {
    color: #ffffff;
    padding: 2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .feature-row .header-content h1 {
    font-size: 3rem;
    margin: 0;
  }

  .feature-row .header-content p {
    font-size: 1.5rem;
    margin: 0;
  }

  .color-line {
    height: 100%;
    position: absolute;
    left: -2rem;
    top: 50%;
    transform: translateY(-50%);
    background-color: #47e4e2;
  }

  .contact-info p {
    font-size: 0.9rem;
    color: #ffffff;
    white-space: nowrap;
  }

  .contact-form form {
    background-color: #ffffff;
  }

  .contact-form {
    margin-top: 15px;
    background-image: url('/assets/images/calm2.png/');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
.contact-form input[type="text"],
.contact-form input[type="email"],
.contact-form textarea {
  width: 100%;
  padding: 0.5rem 0;
  margin-bottom: 1rem;
  border: none;
  border-bottom: 2px solid #000000;
  background-color: #ffffff;
  color: #000000;
  caret-color: lightgrey;
}

.contact-form input[type="text"]::placeholder,
.contact-form input[type="email"]::placeholder,
.contact-form textarea::placeholder {
  color: lightgrey;
}

.contact-form input[type="text"]:focus::placeholder,
.contact-form input[type="email"]:focus::placeholder,
.contact-form textarea:focus::placeholder {
  color: transparent;
}
  .contact-form input,
  .contact-form textarea {
    width: 100%;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
    border: none;
    border-bottom: 2px solid #000000;
    background-color: #ffffff;
    color: #000000;
  }

  .contact-form input[type="submit"] {
    background-color: #47e4e2;
    color: #ffffff;
    border: none;
    padding: 0.75rem 1rem;
    cursor: pointer;
    border-radius: 20px;
    outline: none;
  }

  .contact-form input[type="submit"]:hover {
    background-color: #0c067e;
  }
</style>

<div style="position: relative;">
  <div class="feature-container">
    <div class="feature-row" style="background-image: url('{{ page.feature_row[0].image_path_left }}'); background-size: cover; background-position: center; display: flex; flex: 0 0 66%;">
      <div class="header-content" style="color: #ffffff; padding: 1rem; position: relative; width: 100%;">
        <h1 style="font-size: 3rem; margin-left: 1rem;">
          <span style="position: relative;">
            <span class="color-line" style="position: absolute; left: -1rem; top: 50%; transform: translateY(-50%); width: 10px; height: 100%; background-color: #47e4e2;"></span>
            {{ page.feature_row[0].title_left }}
          </span>
        </h1>
        <p style="font-size: 1.5rem; margin-left: 1rem;">{{ page.feature_row[0].excerpt_left }}</p>
      </div>
    </div>
    <div class="feature-row" style="background-image: url('{{ page.feature_row[1].image_path_right }}'); background-size: cover; background-position: center; display: flex; position: relative; flex: 0 0 34%;">
      <div class="contact-info" style="width: 100%; display: flex; flex-direction: column; color: #ffffff; justify-content: flex-end; padding: 1rem;">
        <h2 style="font-size: 2rem; color: #ffffff; margin-bottom: 1rem;">Contact Info</h2>
        <div style="display: flex; align-items: center; margin-bottom: 1rem;">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 384 512">
            <path fill="#ffffff" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z"/>
          </svg>
          <p style="margin: 0 0 0 0.5rem;">Catalyst Neuro<br>844 Rose Drive,<br>Benicia, CA 94510</p>
        </div>
        <div style="display: flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" color="#ffffff" width="30" height="30" viewBox="0 0 448 512">
            <path fill="#ffffff" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM178.117 262.104C87.429 196.287 88.353 196.121 64 177.167V152c0-13.255 10.745-24 24-24h272c13.255 0 24 10.745 24 24v25.167c-24.371 18.969-23.434 19.124-114.117 84.938-10.5 7.655-31.392 26.12-45.883 25.894-14.503.218-35.367-18.227-45.883-25.895zM384 217.775V360c0 13.255-10.745 24-24 24H88c-13.255 0-24-10.745-24-24V217.775c13.958 10.794 33.329 25.236 95.303 70.214 14.162 10.341 37.975 32.145 64.694 32.011h0c26.768.134 50.568-21.64 64.706-31.98 61.984-44.961 81.225-59.542 95.297-70.225zM400 96H48V80c0-8.837 7.163-16 16-16h320c8.837 0 16 7.163 16 16v16z"/>
          </svg>
          <p style="margin: 0 0 0 0.5rem;">inquiry@catalystneuro.com</p>
        </div>
      </div>
    </div>
  </div>
</div>

   <div class="contact-form" style="padding: 2rem;">
  <form method="post" action="#" netlify>
    <div style="display: flex;">
      <input type="text" id="first" name="first" required placeholder="First name" style="width: 50%;">
      <input type="text" id="last" name="last" required placeholder="Last name" style="width: 50%; margin-left: 1rem;">
    </div>
    <input type="text" id="subject" name="subject" required placeholder="Subject">
    <input type="email" id="email" name="email" required placeholder="Email address">
    <textarea id="message" name="message" required placeholder="Message"></textarea>
    <input type="submit" value="Send Now" style="border-radius: 50px;">
  </form>
</div>
