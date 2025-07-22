import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqs from "../data/faq.json";



function Landingpage() {
  return (
    <main className="flex flex-col gap-4 sm:gap-20 py-6 sm:py-20">
      <section>
        <h1
          className="text-4xl text-center sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-800 leading-tight"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Find Your Dream Job <br />{" "}
          <span className="text-blue-600">and get Hired</span>
        </h1>
        <p className=" text-center mt-4 text-base sm:text-lg md:text-xl text-slate-600 font-medium">
          Browse thousands of job listings or find the perfect candidate
        </p>
      </section>
      <div className="flex justify-center items-center gap-10">
        <Link to={"/jobs"}>
          <Button
            variant="blue"
            size="xl"
            className="text-white cursor-pointer"
          >
            Find Jobs
          </Button>
        </Link>
        <Link to={"/post-job"}>
          <Button variant="destructive" size="xl" className="cursor-pointer">
            Post a Job
          </Button>
        </Link>
      </div>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/4 lg:basis-1/6">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-between items-center">
        <section className="flex flex-col gap-5 ml-12">
          <Card className="bg-slate-500 h-32 w-110 text-white">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">
                For Job Seekers
              </CardTitle>
            </CardHeader>
            <CardContent>
              Search and apply for jobs, track applications, and more.
            </CardContent>
          </Card>
          <Card className="bg-slate-500 h-38 w-110 text-white">
            <CardHeader>
              <CardTitle className="font-bold text-2xl">
                For Employers
              </CardTitle>
            </CardHeader>
            <CardContent>
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>
        <img
          src="banner.png"
          className="mr-12 h-75 w-120 object-fill rounded-3xl"
        ></img>
      </div>
      <Accordion type="multiple" className="w-250 ml-14">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`} className="bg-slate-100 p-1 m-3 rounded-md">
            <AccordionTrigger className="cursor-pointer text-lg font-medium ml-2 text-slate-800">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-sm ml-2 text-slate-600">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
}

export default Landingpage;
