"use client";

import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import { Heading, Text } from "@radix-ui/themes";
import { Separator } from "@/components/ui/separator";
import CreateForm from "./components/CreateForm";
import CreateProjectConfirmDialog from "./components/CreateProjectConfirmDialog";
import {
  ProjectAgri,
  ProjectBasic,
  ProjectFuture,
  ProjectLegal,
  ProjectWeather,
} from "@/models/project";
import { PROJECT_PAGE } from "@/constants/routes.constants";

const formSchema = zod.object({
  projectName: zod.string(),
  projectCost: zod.string(),
  landSize: zod.string(),
  costPerSqyd: zod.string(),
  noOfTickets: zod.number(),
  ticketCost: zod.string(),
  location: zod.string(),
  lanlat: zod.string(),
  amenities: zod.string(),
  benefits: zod.string(),
  soilType: zod.string(),
  waterRights: zod.string(),
  easements: zod.string(),
  farmingInfra: zod.string(),
  landImpCosts: zod.string(),
  subsAndIncentives: zod.string(),
  adjLandUse: zod.string(),
  futDevPotential: zod.string(),
  politicalStability: zod.string(),
  resaleValue: zod.string(),
  titleDeedOwnership: zod.string(),
  legalTitleIssues: zod.string(),
  legalEasements: zod.string(),
  topography: zod.string(),
  climate: zod.string(),
  noiseQuality: zod.string(),
  pollutionQuality: zod.string(),
  envFactors: zod.string(),
});

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();
  const [formValues, setFormValues] = useState();
  const previewBtnRef = useRef();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // projectName: "pristine",
      // projectCost: "1 cr.",
      // landSize: "1 Acre",
      // costPerSqyd: "2500 rupees",
      // noOfTickets: 5,
      // ticketCost: "22 lacs",
      // location: "Hyderabad",
      // lanlat: "25lan 22 lon",
      // amenities: "a,b,c,d",
      // benefits: "a,b,c,d",
      // soilType: "red soil",
      // waterRights: "no",
      // easements: "yes",
      // farmingInfra: "yes",
      // landImpCosts: "yes",
      // subsAndIncentives: "yes",
      // adjLandUse: "yes",
      // futDevPotential: "yes",
      // politicalStability: "yes",
      // resaleValue: "yes",
      // titleDeedOwnership: "yes",
      // legalTitleIssues: "yes",
      // legalEasements: "yes",
      // topography: "yes",
      // climate: "yes",
      // noiseQuality: "yes",
      // pollutionQuality: "yes",
      // envFactors: "yes",
    },
  });
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const supabase = createClientComponentClient();

  async function onPreview(values) {
    setFormValues({ ...values });
    setDialogOpen(true);
  }

  async function onSubmit() {
    setLoading(true);

    const projectHttpValues = {
      ...ProjectBasic.toHttpObject({
        ...formValues,
        amenities: formValues.amenities.split(","),
        benefits: formValues.benefits.split(","),
      }),
      ...ProjectAgri.toHttpObject(formValues),
      ...ProjectFuture.toHttpObject(formValues),
      ...ProjectLegal.toHttpObject(formValues),
      ...ProjectWeather.toHttpObject(formValues),
    };
    const { data, error } = await supabase.rpc(
      "create_project",
      projectHttpValues
    );
    if (!error) {
      toast({
        title: "Project Successfully Created",
      });
      form.reset();
      setDialogOpen(false);
      router.push(PROJECT_PAGE);
    } else {
      toast({
        title: "Unable to create project",
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div className="space-y-8">
      <Separator className="!mt-6" />
      <Heading size="5">Create</Heading>
      <Text weight="light" color="tomato" size="2">
        Whatever is inputted in these forms will be shown to end-user when the
        project is created
      </Text>

      <CreateForm form={form} onSubmit={onPreview} />
      <CreateProjectConfirmDialog
        onSubmit={onSubmit}
        loading={loading}
        open={dialogOpen}
        setOpen={setDialogOpen}
      />
    </div>
  );
}
