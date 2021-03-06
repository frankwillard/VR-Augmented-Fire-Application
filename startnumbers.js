// Initial call of numerical display

AFRAME.registerComponent("startnumbers", {
  init: function() {
    //Could have there be a function that takes in sensor (s1), and does displaynumtemp s1val, togglevisibility s1shadow/s1shadowname/ss1shadowval/s1graph
    
    //Have switched to use autogenerated arrays
    
    displayNumTemp(hrr, "hrr");
    displayNumTemp(s1, "s1");
    displayNumTemp(s2, "s2");
    displayNumTemp(s3, "s3");
    displayNumTemp(s4, "s4");
    displayNumTemp(s5, "s5");
    displayNumTemp(s6, "s6");
    displayNumTemp(s7, "s7");
    displayNumTemp(s8, "s8");
    displayNumTemp(s9, "s9");
    displayNumTemp(s10, "s10");
    
    graph();

    toggleVisibility("#s1shadow");
    toggleVisibility("#s2shadow");
    toggleVisibility("#s3shadow");
    toggleVisibility("#s4shadow");
    toggleVisibility("#s5shadow");
    toggleVisibility("#s6shadow");
    toggleVisibility("#s7shadow");
    toggleVisibility("#s8shadow");

    toggleVisibility("#s1shadowname");
    toggleVisibility("#s2shadowname");
    toggleVisibility("#s3shadowname");
    toggleVisibility("#s4shadowname");
    toggleVisibility("#s5shadowname");
    toggleVisibility("#s6shadowname");
    toggleVisibility("#s7shadowname");
    toggleVisibility("#s8shadowname");
    
    toggleVisibility("#s1shadowval");
    toggleVisibility("#s2shadowval");
    toggleVisibility("#s3shadowval");
    toggleVisibility("#s4shadowval");
    toggleVisibility("#s5shadowval");
    toggleVisibility("#s6shadowval");
    toggleVisibility("#s7shadowval");
    toggleVisibility("#s8shadowval");
    toggleVisibility("#s9shadowval");
    toggleVisibility("#s10shadowval");
 
    toggleVisibility("#s1graph");
    toggleVisibility("#s2graph");
    toggleVisibility("#s3graph");
    toggleVisibility("#s4graph");
    toggleVisibility("#s5graph");
    toggleVisibility("#s6graph");
    toggleVisibility("#s7graph");
    toggleVisibility("#s8graph");
    
  }
});
