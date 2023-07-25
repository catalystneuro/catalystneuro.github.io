---
layout: splash
permalink: /
hidden: true
title: "<span style='text-align: center; font-family: Andale Mono, monospace; font-stretch: ultra-condensed; margin-bottom: 10px; font-weight: normal;'>CATALYST</span><br><span style='text-align: center; font-family: Arial, sans-serif;'>NEURO</span>"
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/splash_banner.jpeg
display_footer_image: true
excerpt: >
  <span style='font-family: Verdana, sans-serif;'>Data and software engineering solutions<br />for neuroscience labs</span>
feature_row_gallery:
  - title: "<span class='underlined-title'><span class='first-word'>Our</span> <b>Portfolio</b></span>"
    excerpt: "We help neuroscientists utilize state-of-the-art tools in data analysis, visualization, organization, sharing, and publishing."
feature_row_bottom:
  - title: "<span class='underlined-title'><span class='first-word'>Our</span> <b>Reach</b></span>"

---


<div class="feature-row centered-feature-row">
  <div class="feature-image">
    <img src="{{ '/assets/images/Our-Mission.jpg' }}" alt="Mission Image">
  </div>
  <div class="feature-text">
    <span class="underlined-title">
      <span class="first-word">Our</span> <b>Mission</b>
    </span>
    <p class="excerpt">
      We believe that the future of neuroscience will be driven by collaboration between labs. Our mission is to develop channels of communication and distribution of resources between labs to enable exponential growth and innovation. We are at the forefront of this effort, shaping the way data, analysis and visualization tools are standardized and shared across the international community of systems neuroscientists. We ensure that these tools accelerate scientific discovery by working in parallel with neuroscientists and work with them to enhance the tools they already use.
    </p>
    <a href="/mission/" class="btn btn--primary rounded-button">
      <span style="font-family: Helvetica, sans-serif;">Learn more</span>
    </a>
  </div>
</div>

<div class="feature-row-blue">
  <div class="feature-text-blue" style="text-align: left;">
    <span class="underlined-title-blue">
      <span class="first-word">Our</span> <b>Software</b>
    </span>
    <p class="excerpt">
      CatalystNeuro develops software solutions across the data pipeline aimed to help neuroscientists focus on the science and accelerate their discovery process immediately. We release and support packages for data homogenization, visualization, analysis, and lab-wide records. These libraries are developed by a team that focuses specifically on neural data and good software practices. Our projects are packaged, documented, and tested for robustness and ease of use. Everything we build is released as it is developed under a permissive license.

We commonly work with labs to customize these software solutions to the specific needs of the lab, interfacing our platforms with their data formats and analysis packages.
    </p>
    <a href="/software/" class="btn btn--primary rounded-button-2">
      <span style="font-family: Helvetica, sans-serif;">Learn more</span>
    </a>
  </div>
  <div class="feature-image-blue">
    <div class="image-viewport">
      <ul class="image-list">
        <li><img class='app-shot' src="http://www.catalystneuro.com/wp-content/uploads/2020/02/lapi-slids.png"></li>
        <li><img class='app-shot' src="http://www.catalystneuro.com/wp-content/uploads/2020/03/lap-slide2.jpg"></li>
      </ul>
    </div>
  </div>
</div>
{% for feature in page.feature_row_gallery %}

  <div class="feature-row" style="margin-top: 15px">
    <h1>{{ feature.title }}</h1>
    <p>{{ feature.excerpt }}</p>
    <div class="image-grid">
      <div class="image-grid-item">
        <img src="{{ '/assets/images/portfolio/slide-1.jpg' }}" alt="Image 1">
        <div class="image-overlay">
          <div class="image-overlay-content">
          <div class="excerpt-line"></div>
            <p>DANDI<br>Massachusetts Institute of Technology</p>
            <a href="{{ '/project/dandi/' }}" class="btn {{ feature.btn_classes[0] }} custom-button-port">Learn More</a>
          </div>
        </div>
      </div>
      <div class="image-grid-item">
        <img src="{{ '/assets/images/portfolio/slide-2.jpg' }}" alt="Image 2">
        <div class="image-overlay">
          <div class="image-overlay-content">
          <div class="excerpt-line"></div>
            <p>Data Engineering Speech Neuroscience<br>UC San Francisco</p>
            <a href="{{ '/project/data-engineering-speech/' }}" class="btn {{ feature.btn_classes[1] }} custom-button-port">Learn More</a>
          </div>
        </div>
      </div>
      <div class="image-grid-item">
        <img src="{{ '/assets/images/portfolio/slide-3.jpg' }}" alt="Image 3">
        <div class="image-overlay">
          <div class="image-overlay-content">
          <div class="excerpt-line"></div>
            <p>Data Science Core of Ripple U19<br>Stanford University</p>
            <a href="{{ '/project/data-science-core/' }}" class="btn {{ feature.btn_classes[2] }} custom-button-port">Learn More</a>
          </div>
        </div>
      </div>
      <div class="image-grid-item">
        <img src="{{ '/assets/images/portfolio/slide-4.jpg' }}" alt="Image 4">
        <div class="image-overlay">
          <div class="image-overlay-content">
          <div class="excerpt-line"></div>
            <p>Data Standardization<br>Simons Foundation</p>
            <a href="{{ '/project/data-standardization/' }}" class="btn {{ feature.btn_classes[3] }} custom-button-port">Learn More</a>
          </div>
        </div>
      </div>
      <div class="image-grid-item">
        <img src="{{ '/assets/images/portfolio/slide-5.jpg' }}" alt="Image 5">
        <div class="image-overlay">
          <div class="image-overlay-content">
          <div class="excerpt-line"></div>
            <p>Interactive Data Visualization<br>Allen Institue and Kitware Inc.</p>
            <a href="{{ '/project/interactive-data/' }}" class="btn {{ feature.btn_classes[4] }} custom-button-port">Learn More</a>
          </div>
        </div>
      </div>
      <div class="image-grid-item">
        <img src="{{ '/assets/images/portfolio/slide-6.jpg' }}" alt="Image 6">
        <div class="image-overlay">
          <div class="image-overlay-content">
          <div class="excerpt-line"></div>
            <p>Neurodata Without Borders Dissemination<br>Lawrence Berkley National Laboratory</p>
            <a href="{{ '/project/nwb-dissemination/' }}" class="btn {{ feature.btn_classes[5] }} custom-button-port">Learn More</a>
          </div>
        </div>
      </div>
    </div>
  </div>
{% endfor %}
<hr style="margin-top: 40px; margin-bottom: 40px;">
{% for feature in page.feature_row_bottom %}
  <div class="feature-row">
    <h1 style="text-align: center;">{{ feature.title }}</h1>
    <div class="gif-container" style="display: flex; justify-content: center; align-items: center;">
      <img src="/assets/images/bottom.gif" alt="Bottom GIF">
    </div>
  </div>
{% endfor %}