import pandas as pd 

df = pd.read_csv('co-est2016-alldata.csv', encoding='latin-1')
cols = df.columns
print(cols)
births = df[['STNAME', 'BIRTHS2016']] 
popEstimate = df[['STNAME', 'POPESTIMATE2016']] 
# combine into one state
births = births.groupby('STNAME').sum().reset_index()
popEstimate = popEstimate.groupby('STNAME').sum().reset_index()
# save as separate csvs
births.to_csv('data/births.csv', index=False)
popEstimate.to_csv('data/popEstimate.csv', index=False)

# filter countries down to United States, Germany, China, and Japan
# renewable_electricity = renewable_electricity[renewable_electricity['country']
                            # .isin(['United States', 'Germany', 'China', 'Japan', 'India'])]
# print(renewable_electricity.head(100))
# calculate renewable electricity per capita as a percentage of total electricity per capita
# renewable_electricity['renewables_elec_per_capita_percentage'] = renewable_electricity['renewables_elec_per_capita'] / renewable_electricity['per_capita_electricity'] 

# save to csv
# renewabl_electricity.to_csv('data/renewable_electricity.csv', index=False)


# df = pd.read_csv('data/owid-energy-data.csv')
# cols = df.columns
# df['year'] = pd.to_datetime(df['year'], format='%Y')
# # remove rows before 1965
# df = df[df['year'] >= '2000-01-01']
# renewable_electricity = df[['country', 'year', 'renewables_cons_change_pct']]
# # only grab the countries with the largest percent change
# grouped_df = df.groupby("country")["renewables_cons_change_pct"].sum().reset_index()
# sorted_df = grouped_df.sort_values(by="renewables_cons_change_pct", ascending=False)
# top_10_countries = sorted_df.head(10)
# top_10_countries.to_csv('data/top_renewable_pct_change.csv', index=False)

# filter countries down to United States, Germany, China, and Japan
# renewable_electricity = renewable_electricity[renewable_electricity['country']
                            # .isin(['United States', 'Germany', 'China', 'Japan', 'India'])]
# print(renewable_electricity.head(100))
# calculate renewable electricity per capita as a percentage of total electricity per capita
# renewable_electricity['renewables_elec_per_capita_percentage'] = renewable_electricity['renewables_elec_per_capita'] / renewable_electricity['per_capita_electricity'] 

# save to csv
# renewable_electricity.to_csv('data/renewable_electricity.csv', index=False)