class Report {
    constructor() {
        this.title = '';
        this.charts = [];
        this.tables = [];
        this.comments = '';
    }

    setTitle(title) {
        this.title = title;
    }

    addChart(chart) {
        this.charts.push(chart);
    }

    addTable(table) {
        this.tables.push(table);
    }

    setComments(comments) {
        this.comments = comments;
    }

    show() {
        console.log('Title:', this.title);
        console.log('Charts:', this.charts);
        console.log('Tables:', this.tables);
        console.log('Comments:', this.comments);
    }
}

module.exports = Report;
