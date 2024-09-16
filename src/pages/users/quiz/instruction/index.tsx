import React from 'react';

const InstructionsPanel: React.FC = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center mb-6 text-green-800">INSTRUCTIONS / निर्देश</h1>

      {/* Section 1 */}
      <div className="mb-4">
        <p className="font-semibold">
          1. Please read the instructions carefully.<br />
          <span className="text-sm">कृपया निर्देशों को ध्यान से पढ़ें।</span>
        </p>
      </div>

      {/* Section 2 - Question Dash Board */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">2. Question Dash Board (QDB):</h2>
        <p className="text-sm mb-2">
          You must continuously keep looking on the QDB appearing on the right-hand side of your screen.
          On this QDB, you will find all the 100 questions which will keep changing colors as you proceed with your exam.
          You can go to any question, either backward or forward, by clicking on that question on the pop-up window.
          <br />
          आपको अपनी स्क्रीन के दायीं ओर दिखाई देने वाली QDB को लगातार देखते रहना चाहिए। इस QDB पर आपको सभी 100 प्रश्न मिलेंगे
          जिन्हें हल करते हुए आगे बढ़ने के क्रम में ये रंग बदलते रहेंगे। QDB पर उस प्रश्न पर क्लिक करके आप आगे या पीछे किसी भी प्रश्न पर जा सकते हैं।
        </p>

        {/* Subsections a, b, c */}
        <ul className="space-y-4">
          <li>
            <p className="font-semibold">
              (a) Question appearing with no color indicates that you have not yet attempted that question.<br />
              <span className="text-sm"> (अ) कोई रंग नहीं दिखने वाला प्रश्न इंगित करता है कि आपने अभी तक उस प्रश्न का प्रयास नहीं किया है।</span>
            </p>
          </li>
          <li>
            <p className="font-semibold">
              (b) Question appearing with green color indicates that you have attempted that question.<br />
              <span className="text-sm">(बी) हरे रंग में दिखने वाला प्रश्न इंगित करता है कि आपने उस प्रश्न का प्रयास किया है।</span>
            </p>
          </li>
          <li>
            <p className="font-semibold">
              (c) Question appearing with purple color indicates that you have, although answered that question, but you would like to revisit the question at a later stage and may review the answer, if time permits.<br />
              <span className="text-sm">(सी) बैंगनी रंग में दिखने वाला प्रश्न इंगित करता है कि आप ने हालाँकि उस प्रश्न का उत्तर दिया है लेकिन बाद में उस प्रश्न पर आप फिर से विचार करना चाह रहें हैं और समय मिलने पर उत्तर की समीक्षा कर सकते हैं।</span>
            </p>
          </li>
        </ul>
      </div>

      {/* Section 3 - How to mark answers */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">3. How to mark your answers:</h2>
        <p className="text-sm mb-4">उत्तर देने की प्रक्रिया:</p>

        <ul className="space-y-4">
          <li>
            <p className="font-semibold">
              (a) Select the correct option and click "Save & Next". This means that you have answered that question and you are moving to the next question.<br />
              <span className="text-sm">(अ) सही विकल्प का चयन करें और "Save & Next" पर क्लिक करें। इसका मतलब है कि आपने उस प्रश्न का उत्तर दे दिया है और आप अगले प्रश्न पर जा रहे हैं।</span>
            </p>
          </li>
          <li>
            <p className="font-semibold">
              (b) If you want to go to any other question, you can click the said question number on the QDB appearing on the right-hand side of your screen.<br />
              <span className="text-sm">(बी) यदि आप किसी अन्य प्रश्न पर जाना चाहते हैं तो आप अपनी स्क्रीन के दायीं ओर दिखाई देने वाली QDB पर दिए गए प्रश्न संख्या पर क्लिक कर सकते हैं।</span>
            </p>
          </li>
          <li>
            <p className="font-semibold">
              (c) If you have chosen an answer but you would like to visit that question again and review the answer at a later stage, if time permits, then you can click on "Save & Mark for Review".<br />
              <span className="text-sm">(सी) यदि आपने कोई उत्तर चुना है लेकिन आप उस प्रश्न को फिर से देखना चाहते हैं और बाद में समय मिलने पर उत्तर की समीक्षा करना चाहते हैं तो आप "Save & Mark for Review" पर क्लिक कर सकते हैं।</span>
            </p>
          </li>
          <li>
            <p className="font-semibold">
              (d) If you have chosen an answer but you would like to change the answer immediately, then you can click on "Clear". This will clear the option you have selected and then you can select your next option.<br />
              <span className="text-sm">(डी) यदि आपने कोई उत्तर चुना है लेकिन आप तुरंत जवाब बदलना चाहते हैं तो आप "Clear" पर क्लिक कर सकते हैं। इससे आपके द्वारा चुने गए विकल्प को मिटा दिया जाएगा और फिर आप अपना अलग विकल्प चुन सकते हैं।</span>
            </p>
          </li>
          <li>
            <p className="font-semibold">
              (e) If you want to quit the exam, then click on "Finish Exam". Once you have clicked this button, you cannot review or change any answer. Therefore, you must be very careful in clicking on "Finish Exam".<br />
              <span className="text-sm">(ई) यदि आप परीक्षा छोड़ना चाहते हैं तो "Finish Exam" पर क्लिक करें। एक बार जब आप इस बटन पर क्लिक कर लेंगे तो आप किसी भी उत्तर की समीक्षा या परिवर्तन नहीं कर सकते हैं। इसलिए आपको "Finish Exam" पर क्लिक करने में बहुत सावधान रहना चाहिए।</span>
            </p>
          </li>
        </ul>
      </div>

      {/* Section 4 - After Exam */}
      <div className="mb-4">
        <p className="font-semibold">
          Once you have finished the exam, your result will be automatically generated in a PDF file and you can take a printout.<br />
          <span className="text-sm">परीक्षा पूर्ण करने के बाद आपका परिणाम PDF फाइल में स्वचालित रूप से जेनरेट हो जाएगा और आप इसका प्रिंट आउट ले सकते हैं।</span>
        </p>
        <p className="font-semibold">
          The soft copy of the result as well as the 100 questions that you answered, will be automatically sent to your e-mail.<br />
          <span className="text-sm">परीक्षा परिणाम के साथ-साथ आपके द्वारा उत्तरित 100 प्रश्न सॉफ्ट कॉपी के रूप में स्वतः ही आपके ई.मेल पर भेज दिया जाएगा।</span>
        </p>
      </div>

      {/* Agreement and Submission */}
      <div className="mb-4">
        
        <p className="font-semibold"><input type="checkbox" className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mr-4" />
 
          I have read and understood the instructions. All computer hardware allotted to me is in proper working condition. I declare that I am not in possession of / not wearing / not carrying any prohibited gadget like mobile phone, Bluetooth devices, etc. / any prohibited material with me into the Examination Hall. I agree that in case of not adhering to the instructions, I shall be liable to be debarred from this Test and/or to disciplinary action, which may include a ban from future Tests / Examinations.<br />
          <span className="text-sm">मैंने निर्देशों को पढ़ा और समझा है। मुझे आवंटित सभी कंप्यूटर हार्डवेयर उचित कार्यशील स्थिति में हैं। मैं घोषणा करता हूं कि मैं परीक्षा कक्ष में कोई निषिद्ध गैजेट जैसे मोबाइल फोन, ब्लूटूथ डिवाइस, आदि/ कोई निषिद्ध सामग्री अपने साथ नहीं रख रहा हूँ/नहीं पहने हूँ। मैं सहमत हूं कि निर्देशों का पालन न करने की स्थिति में, मुझे इस परीक्षा से प्रतिबंधित किया जा सकता है और/या अनुशासनात्मक कार्रवाई की जा सकती है, जिसमें भविष्य की परीक्षाओं से प्रतिबंध शामिल हो सकता है।</span>
        </p>
      </div>

      {/* Final Buttons */}
      <div className="flex justify-center items-center mt-4">
        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">I have read the instructions. Take me to the Exam.</button>
       
      </div>
      <div className='w-full flex justify-center mt-4'>

      <span className="text-2xl font-semibold text-center">All The Best / शुभकामनाएँ</span>
      </div>
    </div>
  );
};

export default InstructionsPanel;
