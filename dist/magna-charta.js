/*! Magna Charta - v0.1.0 - 2012-11-09
* https://github.com/alphagov/magna-charta
 */

(function($) {

  var MagnaCharta = function() {
    this.init = function(table) {
      this.$table = $(table);
      this.$bodyRows = this.$table.find("tbody tr");
      this.addClasses();
      this.dimensions = this.calculateMaxWidth();
      this.applyWidths();
      return this;
    };
    this.utils = {
      isFloat: function(val) {
        return !isNaN(parseFloat(val));
      },
      stripValue: function(val) {
        return val.replace('%', '').replace("£", '').replace("m", "");
      },
      returnMax: function(values) {
        var max = 0;
        for(var i = 0; i < values.length; i++) {
          if(values[i] > max) { max = values[i]; }
        }
        return max;
      }
    };


    this.addClasses = function() {
      this.$bodyRows.addClass("mc-row");
    };

    this.calculateMaxWidth = function() {
      var that = this;
      var resp = {
        max: 0,
        single: 0
      };
      var values = [];
      this.$bodyRows.each(function(i, item) {
        var $this = $(item);
        var $bodyCells = $this.find("td:not(:first)");
        var cellsTotalValue = 0;
        $bodyCells.each(function(j, cell) {
          var $cell = $(cell).addClass("mc-bar-cell");
          var cellVal = that.utils.stripValue($cell.text());
          if(that.utils.isFloat(cellVal)) {
            cellsTotalValue += parseFloat(cellVal, 10);
          }
        });
        values.push(cellsTotalValue);
        resp.max = parseFloat(that.utils.returnMax(values), 10);
      });
      resp.single = parseFloat(100/resp.max, 10);
      return resp;
    };

    this.applyWidths = function() {
      var that = this;
      this.$bodyRows.each(function(i, row) {
        var $this = $(row);
        $this.find("td:not(:first)").each(function(j, cell) {
          var val = parseFloat(that.utils.stripValue($(cell).text()), 10) * that.dimensions.single;
          $(cell).css({
            "width": val + "%"
          });
        });
      });
    };


  };

  $.magnaCharta = function(table) {
    return new MagnaCharta().init(table);
  };


}(jQuery));