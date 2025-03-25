import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/ui/hero";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection/>
      <section className="w-full py-12 md:py-24 lg:md-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">
          Powerful Tools For Your Career Grouwth
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature,index) => {
            return (
              <Card key={index} className="border-2 hover:border-primary transition-colors duration-300">
                <CardContent className="pt-6 text-center flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center">{feature.icon}
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:md-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="font-bold text-4xl">50+</h3>
            <p className="text-muted-foreground">Industries Covered</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="font-bold text-4xl">1000+</h3>
            <p className="text-muted-foreground">Interview Question</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="font-bold text-4xl">95+</h3>
            <p className="text-muted-foreground">Success Rate</p>
          </div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <h3 className="font-bold text-4xl">24/7</h3>
            <p className="text-muted-foreground">AI Support</p>
          </div>
          
        </div>
      </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:md-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mx-auto max-w-3xl mb-12">
          <h2 className="text-3xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground">Four Simple steps to accelerate your carrer growth</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {howItWorks.map((item,index) => {
            return (
              <div key={index} className="flex flex-col justify-center items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">{item.icon}</div>
                <h3 className="font-semibold text-xl">{item.title}</h3>
                <p className="text-muted-foreground text-center">{item.description}</p>
              </div> 
            );
          })}
        </div>
      </div>
      </section>

    </div>
  );
}
