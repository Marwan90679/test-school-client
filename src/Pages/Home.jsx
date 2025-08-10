import {  
    GraduationCap,  
    CheckCircle,  
    Clock,  
    Shield,  
    Award,  
    ArrowRight, 
    BookOpen, 
    Target, 
    Users 
  } from 'lucide-react'; 
  import { Link } from 'react-router'; 

   
  const Home = () => { 
    const features = [ 
      { icon: <Target className="h-6 w-6" />, title: "3-Step Progressive Assessment", description: "Structured evaluation pathway from A1 to C2 levels" }, 
      { icon: <Clock className="h-6 w-6" />, title: "Timed Evaluations", description: "Comprehensive timer system with auto-submission" }, 
      { icon: <Shield className="h-6 w-6" />, title: "Secure Testing Environment", description: "Browser controls and integrity measures" }, 
      { icon: <Award className="h-6 w-6" />, title: "Digital Certification", description: "Automated certification based on performance" } 
    ]; 
   
    const steps = [ 
      { step: 1, levels: "A1 & A2", description: "Foundation level assessment covering basic competencies", color: "bg-blue-500" }, 
      { step: 2, levels: "B1 & B2", description: "Intermediate level evaluation for advanced skills", color: "bg-yellow-500" }, 
      { step: 3, levels: "C1 & C2", description: "Expert level certification for mastery demonstration", color: "bg-green-500" } 
    ]; 
   
    return ( 
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100"> 
        {/* Header */} 
    
   
        {/* Hero Section */} 
        <section className="container mx-auto px-6 py-16 text-center space-y-8"> 
          <div className="space-y-4"> 
            <span className="inline-block bg-gray-200 px-4 py-2 rounded text-sm">Digital Competency Assessment</span> 
            <h1 className="text-5xl font-bold leading-tight"> 
              Test Your Digital Skills with{" "} 
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Confidence</span> 
            </h1> 
            <p className="text-xl text-gray-600 max-w-2xl mx-auto"> 
              Progressive 3-step assessment system that evaluates and certifies your digital competencies from basic (A1) to expert (C2) levels. 
            </p> 
          </div> 
   
          <div className="flex flex-col sm:flex-row gap-4 justify-center"> 
            <Link to="/levelSelection"> 
              <button className="flex items-center gap-2 px-8 py-4 text-lg rounded bg-blue-600 text-white"> 
                <BookOpen className="h-5 w-5" /> Start Assessment <ArrowRight className="h-5 w-5" /> 
              </button> 
            </Link> 
          </div> 
        </section> 
   
        {/* Steps Section */} 
        <section className="container mx-auto px-6 py-16"> 
          <div className="text-center mb-12"> 
            <h2 className="text-3xl font-bold mb-4">Three-Step Assessment Process</h2> 
            <p className="text-lg text-gray-600">Progress through structured levels to earn your digital competency certification</p> 
          </div> 
   
          <div className="grid md:grid-cols-3 gap-8"> 
            {steps.map((step, index) => ( 
              <div key={step.step} className="p-6 shadow-md rounded-lg bg-white relative"> 
                <div className="flex items-center gap-3 mb-4"> 
                  <div className={`w-12 h-12 rounded-full ${step.color} flex items-center justify-center text-white font-bold text-lg`}> 
                    {step.step} 
                  </div> 
                  <div> 
                    <h3 className="font-semibold">Step {step.step}</h3> 
                    <span className="px-2 py-1 text-sm border rounded">{step.levels}</span> 
                  </div> 
                </div> 
                <p className="text-gray-600 mb-4">{step.description}</p> 
                <div className="space-y-2 text-sm"> 
                  <div className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-green-500" /> 22 Competency Areas</div> 
                  <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-blue-500" /> Timed Evaluation</div> 
                  <div className="flex items-center gap-2"><Award className="h-4 w-4 text-yellow-500" /> Level Certification</div> 
                </div> 
                {index < steps.length - 1 && ( 
                  <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2"> 
                    <ArrowRight className="h-6 w-6 text-gray-400" /> 
                  </div> 
                )} 
              </div> 
            ))} 
          </div> 
        </section> 
   
        {/* Features Section */} 
        <section className="container mx-auto px-6 py-16"> 
          <div className="text-center mb-12"> 
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2> 
            <p className="text-lg text-gray-600">Comprehensive assessment tools designed for accurate skill evaluation</p> 
          </div> 
   
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"> 
            {features.map((feature, index) => ( 
              <div key={index} className="p-6 text-center shadow-md rounded-lg bg-white hover:shadow-lg transition-all"> 
                <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-4"> 
                  {feature.icon} 
                </div> 
                <h3 className="font-semibold">{feature.title}</h3> 
                <p className="text-sm text-gray-600">{feature.description}</p> 
              </div> 
            ))} 
          </div> 
        </section> 
   
        {/* CTA Section */} 
        <section className="container mx-auto px-6 py-16"> 
          <div className="max-w-4xl mx-auto p-12 text-center shadow-md rounded-lg bg-white"> 
            <h2 className="text-3xl font-bold mb-4">Ready to Test Your Skills?</h2> 
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6"> 
              Join thousands of professionals who have certified their digital competencies through our comprehensive assessment platform. 
            </p> 
            <Link to="/assessment"> 
              <button className="flex items-center gap-2 px-8 py-4 text-lg rounded bg-blue-600 text-white"> 
                <GraduationCap className="h-5 w-5" /> Begin Assessment Now <ArrowRight className="h-5 w-5" /> 
              </button> 
            </Link> 
          </div> 
        </section> 
   
        {/* Footer */} 
        <footer className="container mx-auto px-6 py-8 border-t text-center text-gray-500"> 
          <p>&copy; 2025 Test_School. Digital Competency Assessment Platform.</p> 
        </footer> 
      </div> 
    ); 
  }; 
   
  export default Home;
  