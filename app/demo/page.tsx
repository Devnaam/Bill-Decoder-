"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ErrorMessage } from "@/components/error-message"

const exampleBills = [
  {
    title: "Digital Personal Data Protection Bill",
    text: `THE DIGITAL PERSONAL DATA PROTECTION BILL, 2023
    A BILL to provide for the processing of digital personal data in a manner that recognizes both the right of individuals to protect their personal data and the need to process such data for lawful purposes, and for matters connected therewith or incidental thereto.
    BE it enacted by Parliament in the Seventy-fourth Year of the Republic of India as follows:—
    CHAPTER I
    PRELIMINARY
    1. (1) This Act may be called the Digital Personal Data Protection Act, 2023.
    (2) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint; and different dates may be appointed for different provisions of this Act.
    2. In this Act, unless the context otherwise requires,—
    (a) "Appellate Tribunal" means the Telecom Disputes Settlement and Appellate Tribunal established under section 14 of the Telecom Regulatory Authority of India Act, 1997;
    (b) "automated means" means any equipment capable of operating automatically in response to instructions given for the purpose of processing digital personal data;
    (c) "Board" means the Data Protection Board of India established under section 17;
    (d) "child" means a person who has not completed eighteen years of age;
    (e) "consent" means the consent given by a Data Principal in accordance with section 6;
    (f) "consent manager" means a person registered with the Board in accordance with sub-section (5) of section 6, who acts as a single point of contact to enable a Data Principal to give, manage, review and withdraw her consent through an accessible, transparent and interoperable platform;
    (g) "Data Fiduciary" means any person who alone or in conjunction with other persons determines the purpose and means of processing of personal data;
    (h) "Data Principal" means the individual to whom the personal data relates and where such individual is a child includes the parents or lawful guardian of such a child;
    (i) "Data Processor" means any person who processes personal data on behalf of a Data Fiduciary;
    (j) "harm" means bodily harm, distortion or theft of identity, harassment, manipulation of behaviour, targeted advertising that may be harmful to a child, fraud, financial loss or loss of reputation or confidentiality, restriction of speech, thought or movement, or any observation or surveillance that is not reasonably expected by the Data Principal;
    (k) "notification" means a notification published in the Official Gazette and the expression "notify" shall be construed accordingly;
    (l) "personal data" means any data about an individual who is identifiable by or in relation to such data;
    (m) "personal data breach" means any unauthorised processing of personal data or accidental disclosure, acquisition, sharing, transfer, loss, destruction of, or loss of access to personal data that compromises the confidentiality, integrity or availability of personal data;
    (n) "prescribed" means prescribed by rules made under this Act;
    (o) "processing" in relation to personal data, means an automated operation or a set of operations performed on digital personal data, and may include operations such as collection, recording, organisation, structuring, storage, adaptation, alteration, retrieval, use, alignment or combination, indexing, sharing, disclosure by transmission, dissemination or otherwise making available, restriction, erasure or destruction;
    (p) "significant Data Fiduciary" means a Data Fiduciary notified as such under section 10;
    (q) "State" means the State as defined in article 12 of the Constitution.`,
  },
  {
    title: "The Bharatiya Nyaya Sanhita Bill",
    text: `THE BHARATIYA NYAYA SANHITA BILL, 2023
    A BILL to consolidate and amend the laws relating to criminal offences.
    BE it enacted by Parliament in the Seventy-fourth Year of the Republic of India as follows:—
    CHAPTER I
    PRELIMINARY
    1. (1) This Act may be called the Bharatiya Nyaya Sanhita, 2023.
    (2) It extends to the whole of India:
    Provided that the provisions of this Sanhita, except those provided in sub-section (3), shall not apply to the State of Jammu and Kashmir.
    (3) The provisions of this Sanhita shall apply also to—
    (a) any offence committed by—
    (i) any citizen of India in any place without and beyond India;
    (ii) any person on any ship or aircraft registered in India wherever it may be;
    (iii) any person in any place without and beyond India committing offence targeting a computer resource located in India; and
    (b) any person in any place without and beyond India who commits an offence targeting the citizens of India or persons in India.
    Explanation.—In this section, the word "offence" includes every act committed outside India which, if committed in India, would be punishable under this Sanhita.
    (4) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint.
    2. In this Sanhita, unless the context otherwise requires,—
    (a) "affidavit" means a statement in writing on oath or affirmation purporting to be made by the person making it and confirmed by his signature or thumb impression, as the case may be;
    (b) "complaint" means any allegation made orally or in writing to a Magistrate, with a view to his taking action under the Bharatiya Nagarik Suraksha Sanhita, 2023 that some person, whether known or unknown, has committed an offence, but does not include a police report;
    (c) "electronic record" shall have the same meaning as assigned to it in clause (t) of sub-section (1) of section 2 of the Information Technology Act, 2000;
    (d) "High Court" means,—
    (i) in relation to any State, the High Court for that State;
    (ii) in relation to a Union territory to which the jurisdiction of the High Court for a State has been extended by law, that High Court;
    (iii) in relation to any other Union territory, the highest Court of criminal appeal for that territory other than the Supreme Court of India;
    (e) "India" means the territory of India excluding the State of Jammu and Kashmir;
    (f) "inquiry" means every inquiry, other than a trial, conducted under the Bharatiya Nagarik Suraksha Sanhita, 2023 by a Magistrate or Court;
    (g) "investigation" includes all the proceedings under the Bharatiya Nagarik Suraksha Sanhita, 2023 for the collection of evidence conducted by a police officer or by any person (other than a Magistrate) who is authorised by a Magistrate in this behalf;
    (h) "judicial proceeding" includes any proceeding in the course of which evidence is or may be legally taken on oath or affirmation;
    (i) "local jurisdiction", in relation to a Court or Magistrate, means the local area within which the Court or Magistrate may exercise all or any of its or his powers under the Bharatiya Nagarik Suraksha Sanhita, 2023;
    (j) "notification" means a notification published in the Official Gazette;
    (k) "offence" means any act or omission made punishable by any law for the time being in force and includes any act in respect of which a complaint may be made under section 2 of the Cattle Trespass Act, 1871;
    (l) "officer in charge of a police station" includes, when the officer in charge of the police station is absent from the station-house or unable from illness or other cause to perform his duties, the police officer present at the station-house who is next in rank to such officer and is above the rank of constable or, when the State Government so directs, any other police officer so present;
    (m) "place" includes a house, building, tent, vehicle and vessel;
    (n) "pleader", when used with reference to any proceeding in any Court, means a person authorised by or under any law for the time being in force, to practise in such Court, and includes any other person appointed with the permission of the Court to act in such proceeding;
    (o) "police report" means a report forwarded by a police officer to a Magistrate under sub-section (2) of section 173 of the Bharatiya Nagarik Suraksha Sanhita, 2023;
    (p) "police station" means any post or place declared generally or specially by the State Government, to be a police station, and includes any local area specified by the State Government in this behalf;
    (q) "prescribed" means prescribed by rules made under this Sanhita;
    (r) "Public Prosecutor" means any person appointed under section 25 of the Bharatiya Nagarik Suraksha Sanhita, 2023, and includes any person acting under the directions of a Public Prosecutor;
    (s) "sub-division" means a sub-division of a district;
    (t) "summons case" means a case relating to an offence, and not being a warrant case;
    (u) "warrant case" means a case relating to an offence punishable with death, imprisonment for life or imprisonment for a term exceeding three years;
    (v) words and expressions used herein and not defined but defined in the Indian Evidence Act, 1872 shall have the meanings respectively assigned to them in that Act.`,
  },
  {
    title: "The Telecommunications Bill",
    text: `THE TELECOMMUNICATIONS BILL, 2023
    A BILL to provide a legal framework for the development of telecommunication sector and telecommunication networks, services and resources, and for matters connected therewith or incidental thereto.
    BE it enacted by Parliament in the Seventy-fourth Year of the Republic of India as follows:—
    CHAPTER I
    PRELIMINARY
    1. (1) This Act may be called the Telecommunications Act, 2023.
    (2) It extends to the whole of India.
    (3) It shall come into force on such date as the Central Government may, by notification in the Official Gazette, appoint; and different dates may be appointed for different provisions of this Act and any reference in any such provision to the commencement of this Act shall be construed as a reference to the commencement of that provision.
    2. In this Act, unless the context otherwise requires,—
    (a) "allocation of spectrum" means the entry of a designated frequency band into the National Table of Frequency Allocations, for use by one or more radiocommunication services under specified conditions;
    (b) "appellate authority" means the appellate authority referred to in section 10;
    (c) "assignment of spectrum" means authorisation given to a person to use radio frequency spectrum under specified conditions;
    (d) "authorisation" means an authorisation issued under section 3;
    (e) "broadcasting service" means a telecommunication service intended to be received by the general public either directly or indirectly through any intermediary and includes—
    (i) sound broadcasting service; and
    (ii) television broadcasting service;
    (f) "Central Government" means the Department of Telecommunications under the Ministry of Communications;
    (g) "Digital Bharat Nidhi" means the fund constituted under section 29;
    (h) "disaster" shall have the same meaning as assigned to it in clause (d) of section 2 of the Disaster Management Act, 2005;
    (i) "entity" means a company, a limited liability partnership, a partnership firm, a sole proprietorship, an association of persons, a society registered under the Societies Registration Act, 1860, a trust, a Hindu Undivided Family, or any other body of persons, whether incorporated or not;
    (j) "harmful interference" means interference which endangers the functioning of a radio navigation service or of other safety services or seriously degrades, obstructs, or repeatedly interrupts a radiocommunication service operating in accordance with the provisions of this Act;
    (k) "identifier" means a series or combination of numerals, symbols or alphabets or any of them, which is capable of uniquely identifying any telecommunication service, telecommunication network, telecommunication equipment, user equipment or user;
    (l) "interference" means the effect of unwanted energy due to one or a combination of emissions, radiations, or inductions upon reception in a radiocommunication system, manifested by any performance degradation, misinterpretation, or loss of information which could be extracted in the absence of such unwanted energy;
    (m) "licence" means a licence issued under section 3;
    (n) "notification" means a notification published in the Official Gazette and the expression "notify" shall be construed accordingly;
    (o) "prescribed" means prescribed by rules made under this Act;
    (p) "public emergency" means a state of danger to the security of India, public order or public health, declared as such by the Central Government or the State Government, as the case may be;
    (q) "public safety" means a state of danger to the safety of human beings, property or the network, declared as such by the Central Government or the State Government, as the case may be;
    (r) "radiocommunication" means telecommunication by means of radio waves;
    (s) "radio waves" or "hertzian waves" means electromagnetic waves of frequencies arbitrarily lower than 3000 gigahertz propagated in space without artificial guide;
    (t) "registration" means a registration issued under section 3;
    (u) "regulation" means a regulation made by the Telecom Regulatory Authority of India under the Telecom Regulatory Authority of India Act, 1997;
    (v) "right of way" means the legal right to use the land or property of another for specific purposes;
    (w) "rule" means a rule made under this Act;
    (x) "spectrum" means a range of radio frequencies within which radio waves may be transmitted for radiocommunication;
    (y) "spectrum assignment holder" means a person to whom spectrum has been assigned under section 4;
    (z) "telecommunication" means the emission, transmission or reception of messages, by wire, radio, optical or other electromagnetic systems, whether or not such messages have been processed to render them intelligible to humans or machines;
    (za) "telecommunication equipment" means any equipment, appliance, instrument, device, material or apparatus, including customer equipment, that can be used for telecommunication, and includes software integral to such telecommunication equipment;
    (zb) "telecommunication identifier" means an identifier used in a telecommunication network;
    (zc) "telecommunication network" means a system or series of systems of telecommunication equipment, or such other resources as may be prescribed, having the capability of providing telecommunication;
    (zd) "telecommunication service" means a service for telecommunication;
    (ze) "Tribunal" means the Telecom Disputes Settlement and Appellate Tribunal established under section 14 of the Telecom Regulatory Authority of India Act, 1997;
    (zf) "user" means a person using a telecommunication service;
    (zg) "user equipment" means the equipment used by a user of a telecommunication service.`,
  },
]

export default function DemoPage() {
  const [selectedBill, setSelectedBill] = useState<string>("")
  const [customBillText, setCustomBillText] = useState<string>("")
  const [simplifiedText, setSimplifiedText] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleExampleSelect = (text: string) => {
    setSelectedBill(text)
    setCustomBillText(text)
  }

  const handleSimplify = async () => {
    if (!customBillText.trim()) {
      setError("Please enter or select bill text to simplify")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billText: customBillText }),
      })

      if (!response.ok) {
        throw new Error("Failed to simplify bill")
      }

      const data = await response.json()
      setSimplifiedText(data.summary)
    } catch (error) {
      console.error("Error simplifying bill:", error)
      setError("Failed to simplify the bill. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">AI Bill Simplification Demo</h1>
          <p className="text-muted-foreground mb-8">
            See how our AI technology simplifies complex legal language into easy-to-understand terms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {exampleBills.map((bill, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedBill === bill.text ? "border-primary" : ""
                }`}
                onClick={() => handleExampleSelect(bill.text)}
              >
                <CardHeader>
                  <CardTitle>{bill.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">{bill.text.substring(0, 150)}...</p>
                </CardContent>
                <CardFooter>
                  <Button variant={selectedBill === bill.text ? "default" : "outline"} size="sm">
                    {selectedBill === bill.text ? "Selected" : "Select"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Bill Text</h2>
              <Card>
                <CardContent className="pt-6">
                  <Textarea
                    value={customBillText}
                    onChange={(e) => setCustomBillText(e.target.value)}
                    placeholder="Enter bill text here or select an example above..."
                    className="min-h-[400px]"
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSimplify} disabled={isLoading || !customBillText.trim()}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Simplifying...
                      </>
                    ) : (
                      "Simplify with AI"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Simplified Version</h2>
              <Card>
                <CardContent className="pt-6">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center min-h-[400px]">
                      <Loader2 className="h-8 w-8 animate-spin mb-4" />
                      <p className="text-muted-foreground">Our AI is simplifying the bill...</p>
                    </div>
                  ) : simplifiedText ? (
                    <div className="prose dark:prose-invert max-w-none min-h-[400px]">
                      <div className="whitespace-pre-line">{simplifiedText}</div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center min-h-[400px] text-muted-foreground">
                      <p>The simplified version will appear here after processing.</p>
                      <p className="mt-2">
                        Select an example bill or enter your own text and click "Simplify with AI".
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {error && (
            <div className="mt-6">
              <ErrorMessage message={error} retry={() => setError(null)} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
