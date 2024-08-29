class ReportDirector {
    constructor(builder) {
        this.builder = builder;
    }

    async constructSimpleReport() {
        await this.builder
            .buildTitle('Simple Report')
            .buildChart('Simple Chart');
        return this.builder.build();
    }

    async constructDetailedReport() {
        await this.builder
            .buildTitle('Detailed Report')
            .buildChart('Chart 1')
            .buildTable('Table 1')
            .buildComments('This is a detailed report.');
        return this.builder.build();
    }
}

module.exports = ReportDirector;
