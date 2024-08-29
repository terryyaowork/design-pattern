const Report = require('./Report');

class ReportBuilder {
    constructor() {
        this.report = new Report();
    }

    buildTitle(title) {
        this.report.setTitle(title);
        return this;
    }

    buildChart(chart) {
        this.report.addChart(chart);
        return this;
    }

    buildTable(table) {
        this.report.addTable(table);
        return this;
    }

    buildComments(comments) {
        this.report.setComments(comments);
        return this;
    }

    async build() {
        return this.report;
    }
}

module.exports = ReportBuilder;
