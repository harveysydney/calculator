create table calculation
(
  id integer not null AUTO_INCREMENT,
  email varchar(255),
  income DOUBLE,
  taxYear integer,
  superPercent DOUBLE,
  gross DOUBLE,
  grossNSuper DOUBLE,
  superannuation DOUBLE,
  taxAmount DOUBLE,
  netAmount DOUBLE,
  netNSuper DOUBLE,
  includeSuper BOOLEAN,
  primary key(id)
);