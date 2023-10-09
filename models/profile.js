export default class Profile {
  constructor(obj) {
    this.userId = obj.userId;
    this.createdAt = obj.createdAt;
    this.name = obj.name;
    this.email = obj.email;
    this.mobile = obj.mobile;
    this.city = obj.city;
    this.prefLandhold = obj.prefLandhold;
    this.prefLocation = obj.prefLocation;
    this.role = obj.role;
  }

  static keyMap = {
    userId: "user_id",
    createdAt: "created_at",
    name: "name",
    email: "email",
    mobile: "mobile",
    city: "city",
    prefLandhold: "pref_landhold",
    prefLocation: "pref_location",
    role: "role",
  };

  static getRoleDesc() {
    switch (this.role) {
      case user:
        return "User is not part of any project";
      case customer:
        return "User is part of atleast one project";
      case admin:
        return "User can access dashboard";
      default:
        return "";
    }
  }

  static from(obj) {
    if (!obj) return null;
    return new Profile({
      userId: obj.user_id,
      createdAt: obj.created_at,
      name: obj.name,
      email: obj.email,
      mobile: obj.mobile,
      city: obj.city,
      prefLandhold: obj.pref_landhold,
      prefLocation: obj.pref_location,
      role: obj.role,
    });
  }

  static fromAll(arr) {
    if (!arr?.length) return null;
    return arr.map(Profile.from);
  }
}
