class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    if (this.creator) {
      return 1 + this.creator.numberOfVampiresFromOriginal;
    } else {
      return 0;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    let closestVamp;
    if (this === vampire) {
      closestVamp = this;
    } else if (this.creator === vampire.creator) {
      //check if siblings
      closestVamp = this.creator;
    } else {
      //if this is more senior, check against vampire's creator
      if (this.isMoreSeniorThan(vampire)) {
        closestVamp = this.closestCommonAncestor(vampire.creator);
      } else {
        //else, check against this creator
        closestVamp = vampire.closestCommonAncestor(this.creator);
      }
    }
    return closestVamp;
  }
}

module.exports = Vampire;

