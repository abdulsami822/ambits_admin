export class Property {
  static STATUS = {
    EXIT: "exit",
    ACTIVE: "active",
  };

  constructor(obj) {
    this.id = obj.id;
    this.userId = obj.userId;
    this.projectId = obj.projectId;
    this.status = obj.status;
    this.createdAt = obj.createdAt;
  }

  isExit() {
    return this.status === Property.STATUS.EXIT;
  }

  getStatusDisplay() {
    switch (this.status) {
      case Property.STATUS.ACTIVE:
        return "Active";
      case Property.STATUS.EXIT:
        return "Exit";
    }
  }

  static from(obj) {
    if (!obj) return null;
    return new Property({
      id: obj.id,
      userId: obj.user_id,
      projectId: obj.project_id,
      status: obj.status,
      createdAt: obj.created_at,
    });
  }

  static fromAll(arr) {
    if (!arr?.length) return;
    return arr.map(Property.from);
  }
}
