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
    this.roleId = obj.roleId;
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
    roleId: "role-id",
  };

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
      roleId: obj.role_id,
    });
  }

  static fromAll(arr) {
    if (!arr?.length) return null;
    return arr.map(Profile.from);
  }
}
