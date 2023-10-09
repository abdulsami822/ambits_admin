import React from "react";
import TextField from "@/components/ui/textField";
import { Button } from "@/components/ui/button";
import InputField from "@/components/ui/inputField";
import { Form } from "@/components/ui/form";
import { Heading } from "@radix-ui/themes";
import { Separator } from "@/components/ui/separator";

export default function CreateForm({ form, onSubmit }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Heading size="4">Basic Details</Heading>
        <Separator className="!mt-6" />
        <div className="grid grid-cols-4 gap-y-6 gap-x-8">
          <InputField form={form} name="projectName" label="project name" />
          <InputField
            form={form}
            name="projectCost"
            label="project cost"
            placeholder="example, 2 Cr."
          />
          <InputField
            form={form}
            name="landSize"
            label="Land Size"
            placeholder="example, 2 Acers"
          />
          <InputField
            form={form}
            name="costPerSqyd"
            label="Cost per sqyd"
            placeholder="example, 2,400"
          />
          <InputField
            form={form}
            name="noOfTickets"
            label="Number of Tickets"
            placeholder="example, 5"
          />
          <InputField
            form={form}
            name="ticketCost"
            label="Cost of a ticket"
            placeholder="example, 22 Lacs"
          />
          <InputField
            form={form}
            name="location"
            label="Location"
            placeholder="project's location"
          />
          <InputField
            form={form}
            name="lanlat"
            label="Longitude and Latitude"
            placeholder="project's pin location"
          />
        </div>
        <div className="grid grid-cols-2 gap-y-6 gap-x-8">
          <TextField
            form={form}
            name="ameneties"
            label="Ameneties (comma seperated)"
            placeholder="type the ameneties comma seperated"
          />
          <TextField
            form={form}
            name="benefits"
            label="Benefits (comma seperated)"
            placeholder="type the benefits comma seperated"
          />
        </div>
        <Heading size="4">Agricultural Land Parameters</Heading>
        <Separator className="!mt-6" />
        <div className="grid grid-cols-4 gap-y-6 gap-x-8">
          <InputField
            form={form}
            name="soilType"
            label="Solid Type"
            placeholder="example, Red / Grey Soil"
          />
          <InputField form={form} name="waterRights" label="Water Rights" />
          <InputField form={form} name="easements" label="Easements" />
          <InputField
            form={form}
            name="farmingInfra"
            label="Farming Infrastructure"
          />
          <InputField
            form={form}
            name="landImpCosts"
            label="Land Improvement Costs"
          />

          <InputField
            form={form}
            name="subsAndIncentives"
            label="Agricultural Subsidies and Incentives"
          />
        </div>
        <Heading size="4">Future Prospects-Value For Money</Heading>
        <Separator className="!mt-6" />
        <div className="grid grid-cols-4 gap-y-6 gap-x-8">
          <InputField
            form={form}
            name="adjLandUse"
            label="Adjacent Land Use"
            placeholder="example, Yes/ No"
          />
          <InputField
            form={form}
            name="futDevPotential"
            label="Future Development Potential"
          />
          <InputField
            form={form}
            name="politicalStability"
            label="Political Stability"
            placeholder="example, 2,400"
          />
          <InputField form={form} name="resaleValue" label="Resale Value" />
        </div>
        <Heading size="4">Legal Details</Heading>

        <Separator className="!mt-6" />
        <div className="grid grid-cols-4 gap-y-6 gap-x-8">
          <InputField
            form={form}
            name="titleDeedOwnership"
            label="Title Deed Ownership"
            placeholder="Ambient Habitats Private Limited"
          />
          <InputField
            form={form}
            name="legalTitleIssues"
            label="Legal and Title Issues"
          />
          <InputField
            form={form}
            name="legalEasements"
            label="Easements, Access and Roads"
          />
          <InputField
            form={form}
            name="topography"
            label="Topography & Terrain"
          />
        </div>
        <Heading size="4">Weather Details</Heading>

        <Separator className="!mt-6" />
        <div className="grid grid-cols-4 gap-y-6 gap-x-8">
          <InputField form={form} name="climate" label="Climate" />
          <InputField form={form} name="noiseQuality" label="Noise Quality" />
          <InputField
            form={form}
            name="pollutionQuality"
            label="Pollution Quality"
          />
          <InputField
            form={form}
            name="envFactors"
            label="Environmental Factors"
          />
        </div>
        <Separator className="!mt-6" />
        <div className="flex justify-end">
          <Button type="submit" className="w-64">
            Preview and Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
