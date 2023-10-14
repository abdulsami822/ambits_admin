// export class Project {
//   constructor(obj) {
//     this.basicDetails = obj.basicDetails;
//     this.agriculturalDetails = obj.agriculturalDetails;
//     this.futureDetails = obj.futureDetails;
//     this.legalDetails = obj.legalDetails;
//     this.weatherDetails = obj.weatherDetails;
//   }
//   static from(obj) {
//     if (!obj) return null;
//     return new Project({
//       basicDetails: ProjectBasic.from(obj.basicDetails),
//       agriculturalDetails: ProjectAgri.from(obj.agriculturalDetails),
//       futDevPotential: ProjectFuture.from(obj.futDevPotential),
//       legalDetails: ProjectLegal.from(obj.legalDetails),
//       weatherDetails: ProjectWeather.from(obj.weatherDetails),
//     });
//   }
// }

export class ProjectBasic {
  constructor(obj) {
    this.projectId = obj.projectId;
    this.name = obj.name;
    this.projectCost = obj.projectCost;
    this.landSize = obj.landSize;
    this.costPerSqyd = obj.costPerSqyd;
    this.noOfTickets = obj.noOfTickets;
    this.ticketCost = obj.ticketCost;
    this.location = obj.location;
    this.lanlat = obj.lanlat;
    this.amenities = obj.amenities;
    this.benefits = obj.benefits;
    this.createdAt = obj.createdAt;
  }

  static from(obj) {
    if (!obj) return null;
    return new ProjectBasic({
      projectId: obj.project_id,
      name: obj.name,
      projectCost: obj.project_cost,
      landSize: obj.landsize,
      costPerSqyd: obj.cost_persqy,
      noOfTickets: obj.no_of_tickets,
      ticketCost: obj.ticket_cost,
      location: obj.location,
      lanlat: obj.lan_lat,
      amenities: obj.amenities,
      benefits: obj.benefits,
      createdAt: obj.created_at,
    });
  }

  static fromAll(arr) {
    if (!arr?.length) return null;
    return arr.map(ProjectBasic.from);
  }

  static toHttpObject(obj) {
    if (!obj) return null;
    return {
      project_id: obj.projectId,
      name: obj.projectName,
      project_cost: obj.projectCost,
      landsize: obj.landSize,
      cost_persqy: obj.costPerSqyd,
      no_of_tickets: obj.noOfTickets,
      ticket_cost: obj.ticketCost,
      location: obj.location,
      lan_lat: obj.lanlat,
      amenities: obj.amenities,
      benefits: obj.benefits,
    };
  }

  static keyMap = {
    projectId: "project_id",
    createdAt: "created_at",
    noOfTickets: "no_of_tickets",
  };
}
export class ProjectAgri {
  constructor(obj) {
    this.soilType = obj.soilType;
    this.waterRights = obj.waterRights;
    this.easements = obj.easements;
    this.farmingInfra = obj.farmingInfra;
    this.landImpCosts = obj.landImpCosts;
    this.subsAndIncentives = obj.subsAndIncentives;
  }

  static from(obj) {
    if (!obj) return null;
    return new ProjectAgri({
      soilType: obj.soil_type,
      waterRights: obj.water_rights,
      easements: obj.easements,
      farmingInfra: obj.farming_infra,
      landImpCosts: obj.land_imp_costs,
      subsAndIncentives: obj.subs_and_incentives,
    });
  }

  static toHttpObject(obj) {
    if (!obj) return null;
    return {
      soil_type: obj.soilType,
      water_rights: obj.waterRights,
      easements: obj.easements,
      farming_infra: obj.farmingInfra,
      land_imp_costs: obj.landImpCosts,
      subs_and_incentives: obj.subsAndIncentives,
    };
  }
}
export class ProjectFuture {
  constructor(obj) {
    this.adjLandUse = obj.adjLandUse;
    this.futDevPotential = obj.futDevPotential;
    this.politicalStability = obj.politicalStability;
    this.resaleValue = obj.resaleValue;
  }

  static from(obj) {
    if (!obj) return null;
    return new ProjectFuture({
      adjLandUse: obj.adj_land_use,
      futDevPotential: obj.future_dev_potential,
      politicalStability: obj.political_stability,
      resaleValue: obj.resale_value,
    });
  }
  static toHttpObject(obj) {
    if (!obj) return null;
    return {
      adj_land_use: obj.adjLandUse,
      future_dev_potential: obj.futDevPotential,
      political_stability: obj.politicalStability,
      resale_value: obj.resaleValue,
    };
  }
}
export class ProjectLegal {
  constructor(obj) {
    this.titleDeedOwnership = obj.titleDeedOwnership;
    this.legalTitleIssues = obj.legalTitleIssues;
    this.easements = obj.easements;
    this.topography = obj.topography;
  }

  static from(obj) {
    if (!obj) return null;
    return new ProjectLegal({
      titleDeedOwnership: obj.title_deeed_ownership,
      legalTitleIssues: obj.legal_and_title_issues,
      easements: obj.easements,
      topography: obj.topography,
    });
  }

  static toHttpObject(obj) {
    if (!obj) return null;
    return {
      title_deed_ownership: obj.titleDeedOwnership,
      legal_and_title_issues: obj.legalTitleIssues,
      legal_easements: obj.easements,
      topography: obj.topography,
    };
  }
}
export class ProjectWeather {
  constructor(obj) {
    this.climate = obj.climate;
    this.noiseQuality = obj.noiseQuality;
    this.pollutionQuality = obj.pollutionQuality;
    this.envFactors = obj.envFactors;
  }

  static from(obj) {
    if (!obj) return null;
    return new ProjectWeather({
      climate: obj.climate,
      noiseQuality: obj.noise_quality,
      pollutionQuality: obj.pollution_quality,
      envFactors: obj.env_factors,
    });
  }

  static toHttpObject(obj) {
    if (!obj) return null;
    return {
      climate: obj.climate,
      noise_quality: obj.noiseQuality,
      pollution_quality: obj.pollutionQuality,
      env_factors: obj.envFactors,
    };
  }
}
